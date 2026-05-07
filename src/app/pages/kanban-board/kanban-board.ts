import { Component, inject, signal } from '@angular/core';
import { Topbar } from '../../components/topbar/topbar';
import { Sidebar } from '../../components/sidebar/sidebar';
import { StatRow } from '../../components/stat-row/stat-row';
import { ErrorHandlerService } from '../../service/error-handler/error-handler.service';
import { DashboardService } from '../../service/dashboard/dashboard-service';
import { StorageService } from '../../service/storage/storage-service';
import { Router } from '@angular/router';
import { ApplicationService } from '../../service/application/application-service';
import { CommonModule } from '@angular/common';
import { LacPipe } from '../../shared/pipes/lac.pipe';
import { AppDatePipe } from '../../shared/pipes/app-date.pipe';
import { JobModal } from '../../components/job-modal/job-modal';
@Component({
  selector: 'app-kanban-board',
  imports: [Topbar, Sidebar, CommonModule, LacPipe, AppDatePipe, JobModal],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
})
export class KanbanBoard {
  router = inject(Router);
  storageService = inject(StorageService);
  dashboardService = inject(DashboardService);
  errorHandler = inject(ErrorHandlerService);
  applicationService = inject(ApplicationService);

  private isInitialized = false;
  applications = signal({
    interviewAppL: [] as any[],
    appliedAppL: [] as any[],
    offerAppL: [] as any[],
    rejectedAppL: [] as any[],
    GhostedAppL: [] as any[],
  });
  isModalOpen = signal(false);
  interviewAppL: any[] = [];
  appliedAppL: any[] = [];
  offerAppL: any[] = [];
  rejectedAppL: any[] = [];
  GhostedAppL: any[] = [];

  ngOnInit() {
    if (this.isInitialized) {
      return; // Prevent duplicate initialization
    }
    this.isInitialized = true;

    const user = this.storageService.get('user');
    if (!user) {
      console.log('No user logged in, redirecting to login page.');
      this.router.navigate(['/']);
    } else {
      this.getApplications();
    }
  }
  // method to open the modal for adding new application data from kanban board page
  openModal() {
    this.isModalOpen.set(true);
  }
  // method to close the modal
  closeModal() {
    this.isModalOpen.set(false);
  }

  // getting all the applications and categorizing them based on their stage for kanban board display
  getApplications() {
    this.applicationService.getAllApplications().subscribe({
      next: (res: any) => {
        const applicationsData = res.jobApplications;
        const categorized = {
          interviewAppL: [] as any[],
          appliedAppL: [] as any[],
          offerAppL: [] as any[],
          rejectedAppL: [] as any[],
          GhostedAppL: [] as any[],
        };

        for (let app of applicationsData) {
          // Process each application
          switch (app.stage) {
            case 'Interview':
              categorized.interviewAppL.push(app);
              break;
            case 'Applied':
              categorized.appliedAppL.push(app);
              break;
            case 'Offer':
              categorized.offerAppL.push(app);
              break;
            case 'Rejected':
              categorized.rejectedAppL.push(app);
              break;
            default:
              categorized.GhostedAppL.push(app);
              break;
          }
        }

        this.applications.set(categorized);
        console.log('Interview:', categorized.interviewAppL);
        console.log('Applied:', categorized.appliedAppL);
        console.log('Offer:', categorized.offerAppL);
        console.log('Rejected:', categorized.rejectedAppL);
        console.log('Ghosted:', categorized.GhostedAppL);
      },
      error: (error: any) => {
        if (this.errorHandler.handleUnauthorizedError(error)) return;
        console.error(error);
      },
    });
  }
}
