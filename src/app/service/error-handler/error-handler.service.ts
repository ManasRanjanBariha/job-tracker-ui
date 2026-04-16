import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage-service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private router = inject(Router);
  private storageService = inject(StorageService);

  /**
   * Handles 401 Unauthorized errors from API calls
   * If token refresh fails or no refresh token exists, redirects to login
   * @param error - The error object from the API call
   * @returns true if error was handled, false otherwise
   */
  handleUnauthorizedError(error: any): boolean {
    // Check if this is a 401 Unauthorized error
    if (error.status === 401 || error.statusText === 'Unauthorized') {
      console.log('Token expired, checking if refresh token exists...');
      
      const refreshToken = this.storageService.getValue('refreshToken');
      if (!refreshToken) {
        // No refresh token available, redirect to login
        console.log('No refresh token found, redirecting to login.');
        this.redirectToLogin();
        return true;
      }

      // If we have a refresh token but still got 401 here, 
      // it means the interceptor failed to refresh or refresh also expired
      console.log('Refresh token present but API returned 401, likely refresh also expired.');
      this.clearTokensAndRedirect();
      return true;
    }

    return false;
  }

  /**
   * Clears all authentication data from localStorage
   */
  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    console.log('All auth data cleared from localStorage');
  }

  /**
   * Clears tokens and redirects to login page
   */
  clearTokensAndRedirect(): void {
    this.clearTokens();
    this.redirectToLogin();
  }

  /**
   * Redirects user to login page
   */
  redirectToLogin(): void {
    this.router.navigate(['/auth']);
  }
}
