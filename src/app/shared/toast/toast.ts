import { Component, inject } from '@angular/core';
import { ToastService } from '../../service/toast/toast-service';
import { Toast as ToastModel } from '../../model/toast.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  trackById(index: number, toast: ToastModel) {
    return toast.id;
  }

  remove(id: number) {
    this.toastService.removeToast(id);
  }
  getIcon(type: ToastModel['type']) {
    const icons = {
      success: '✓',
      error:   '✕',
      warning: '⚠',
      info:    'ℹ'
    }; 
    return icons[type] || '';
  }

}
