import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';
import { StorageService } from '../../service/storage/storage-service';
import { catchError, throwError, from, switchMap } from 'rxjs';
import endPoints from '../../const/endpoints';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  
  const token = storageService.getValue('accessToken');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      console.log('Interceptor caught error:', error.status, error.statusText);
      // If unauthorized (401) and not a refresh request, try to refresh the token
      if (error.status === 401 && !req.url.includes(endPoints.REFRESH)) {
        console.log('🔄 Attempting to refresh token...');
        const refreshToken = storageService.getValue('refreshToken');
        if (refreshToken) {
          console.log('✅ Refresh token found, calling refresh endpoint');
          
          return from(authService.refreshToken(refreshToken)).pipe(
            switchMap((response) => {
              console.log('✅ Token refresh successful, response:', response);
              if (response.accessToken || response.token) {
                // Store the new access token
                const newToken = response.accessToken || response.token;
                storageService.setWithExpiry('accessToken', newToken, 3600000); // 1 hour
                console.log('✅ New token stored, retrying original request');
                
                // Retry the original request with new token
                const clonedReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`
                  }
                });
                return next(clonedReq);
              }
              return throwError(() => error);
            }),
            catchError((refreshError) => {
              console.error('❌ Token refresh failed:', refreshError);
              // Clear all auth data and redirect to login
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              console.log('🔴 All auth data cleared, redirecting to login');
              window.location.href = '/auth';
              return throwError(() => refreshError);
            })
          );
        } else {
          console.log('❌ No refresh token found');
        }
      }
      return throwError(() => error);
    })
  );
};
