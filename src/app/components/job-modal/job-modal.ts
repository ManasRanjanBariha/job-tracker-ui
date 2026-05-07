import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../service/application/application-service';

@Component({
  selector: 'app-job-modal',
  imports: [FormsModule],
  templateUrl: './job-modal.html',
  styleUrl: './job-modal.scss',
})
export class JobModal {
  @Input() isOpen = false;
  @Output() modalClose = new EventEmitter<void>();
  @Output() applicationSaved = new EventEmitter<any>();

  applicationService = inject(ApplicationService);

  applicationData = {
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
      alert('Please fill in Company Name and Job Title');
      return;
    }

    this.applicationService.createApplication(this.applicationData).subscribe({
      next: (response) => {
        console.log('Application saved successfully:', response);
        // Emit the application data to parent component        this.applicationSaved.emit(response);
        // Reset form and close modal
        this.resetForm();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error saving application:', error);
        alert('Failed to save application. Please try again.');
      }
    });
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
