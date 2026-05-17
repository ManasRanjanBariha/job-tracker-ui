import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../service/application/application-service';
import { ToastService } from '../../service/toast/toast-service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-job-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './job-modal.html',
  styleUrl: './job-modal.scss',
})
export class JobModal {
  @Input() isOpen = false;
  @Output() modalClose = new EventEmitter<void>();
  @Output() applicationSaved = new EventEmitter<any>();

  applicationService = inject(ApplicationService);
  toastService = inject(ToastService);

  @Input() applicationData = {
    company: '',
    role: '',
    location: '',
    stage: 'Applied',
    salary: '',
    appliedDate: '',
    priority: 'medium',
    jobUrl: '',
    note: '',
    source: ''
  };

  // Computed property to determine if we're in edit mode
  get isEditMode(): boolean {
    return !!(this.applicationData as any)?.id || (this.applicationData as any)?.id;
  }

  closeModal() {
    this.modalClose.emit();
  }

  onOverlayClick(event: MouseEvent) {
    // Close modal only when clicking the overlay background, not the modal content
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  saveApplication() {
    // Validate required fields
    if (!this.applicationData.company || !this.applicationData.role) {
      this.toastService.error('Please fill in Company Name and Job Title');
      return;
    }

    if (this.isEditMode) {
      // Update existing application
      const id = (this.applicationData as any)._id || (this.applicationData as any).id;
      this.applicationService.updateApplication(id, this.applicationData).subscribe({
        next: (response:any) => {
          console.log('Application updated successfully:', response);
          this.toastService.success(`${this.applicationData.company} application updated! 🎉`);
          this.applicationSaved.emit(response);
          this.closeModal();
        },
        error: (error:any ) => {
          console.error('Error updating application:', error);
          this.toastService.error('Failed to update application. Please try again.');
        }
      });
    } else {
      // Create new application
      this.applicationService.createApplication(this.applicationData).subscribe({
        next: (response) => {
          console.log('Application saved successfully:', response);
          this.toastService.success(`${this.applicationData.company} added to your tracker! 🚀`);
          this.applicationSaved.emit(response);
          this.resetForm();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error saving application:', error);
          this.toastService.error('Failed to save application. Please try again.');
        }
      });
    }
  }

  resetForm() {
    this.applicationData = {
      company: '',
      role: '',
      location: '',
      stage: 'Applied',
      salary: '',
      appliedDate: '',
      priority: 'Medium',
      jobUrl: '',
      note: '',
      source: ''
    };
  }
}

