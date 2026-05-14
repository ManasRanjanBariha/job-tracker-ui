import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Topbar } from '../../components/topbar/topbar';
import { Sidebar } from '../../components/sidebar/sidebar';
import { JobModal } from '../../components/job-modal/job-modal';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApplicationService } from '../../service/application/application-service';
import { LacPipe } from '../../shared/pipes/lac.pipe';
import { AppDatePipe } from '../../shared/pipes/app-date.pipe';

@Component({
  selector: 'app-application-detail',
  imports: [CommonModule, Topbar, Sidebar, JobModal,LacPipe, AppDatePipe],
  templateUrl: './application-detail.html',
  styleUrl: './application-detail.scss',
})
export class ApplicationDetail {
  isModalOpen = signal(false);

  jobData: any=signal<any>(null);

  router = inject(Router);
  route = inject(ActivatedRoute);
  applicationService = inject(ApplicationService);

  constructor() {}

  ngOnInit() {
    const applicationId = this.route.snapshot.paramMap.get('id');
    this.fetchApplicationDetail(applicationId);
  }

  // method to open the modal for adding new application data from kanban board page
  openModal() {
    this.isModalOpen.set(true);
  }
  // method to close the modal
  closeModal() {
    this.isModalOpen.set(false);
  }
  fetchApplicationDetail(id: string | null) {
    if (id) {
      this.applicationService.getApplicationById(id).subscribe(
        (data: any) => {
          this.jobData.set(data.jobApplication);
          console.log('Fetched application detail:', this.jobData());
        },
        (error: any) => {
          console.error('Error fetching application detail:', error);
        },
      );
    }
  }
}
