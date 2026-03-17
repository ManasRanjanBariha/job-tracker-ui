import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { Toast } from '../../model/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts = this.toastsSubject.asObservable();

  private idCounter = 0;

  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info', duration = 3000) {
    const toast: Toast = {
      id: this.idCounter++,
      message,
      type,
      duration,
    };
    this.toastsSubject.next([...this.toastsSubject.value, toast]);
    if(duration > 0) {
      setTimeout(() => this.removeToast(toast.id), duration);
    }
  }
  removeToast(id: number) {
    this.toastsSubject.next(this.toastsSubject.value.filter(toast => toast.id !== id));
  }

  success(message: string, duration = 3000) {
    this.showToast(message, 'success', duration);
  }
  error(message: string, duration = 3000) {
    this.showToast(message, 'error', duration);
  }
  warning(message: string, duration = 3000) {
    this.showToast(message, 'warning', duration);
  }
  info(message: string, duration = 3000) {
    this.showToast(message, 'info', duration);
  }
}
