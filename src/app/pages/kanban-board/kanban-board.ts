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
  private allApplications = signal({
    interviewAppL: [] as any[],
    appliedAppL: [] as any[],
    offerAppL: [] as any[],
    rejectedAppL: [] as any[],
    GhostedAppL: [] as any[],
  });
  
  applications = signal({
    interviewAppL: [] as any[],
    appliedAppL: [] as any[],
    offerAppL: [] as any[],
    rejectedAppL: [] as any[],
    GhostedAppL: [] as any[],
  });
  
  isModalOpen = signal(false);
  activeFilter = signal<'All' | 'High Priority' | 'This Week'>('All');
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

  // method to navigate to application detail page on click of application card in kanban board
  navigationToApplicationDetail(applicationId: number) {
    this.router.navigate(['/application', applicationId]);
  }

  // method to go to application detail page
  goDetail() {
    // TODO: Implement navigation to application detail page
    console.log('Navigate to application details');
  }

  // method to set the active filter
  setFilter(filterType: 'All' | 'High Priority' | 'This Week') {
    this.activeFilter.set(filterType);
    this.applyFilters();
  }

  // method to apply filters based on active filter
  applyFilters() {
    const filterType = this.activeFilter();
    let filteredApplications = JSON.parse(JSON.stringify(this.allApplications()));

    if (filterType === 'High Priority') {
      filteredApplications = {
        interviewAppL: this.allApplications().interviewAppL.filter(app => app.priority === 'high'),
        appliedAppL: this.allApplications().appliedAppL.filter(app => app.priority === 'high'),
        offerAppL: this.allApplications().offerAppL.filter(app => app.priority === 'high'),
        rejectedAppL: this.allApplications().rejectedAppL.filter(app => app.priority === 'high'),
        GhostedAppL: this.allApplications().GhostedAppL.filter(app => app.priority === 'high'),
      };
    } else if (filterType === 'This Week') {
      const today = new Date();
      const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const filterByWeek = (app: any) => {
        const appliedDate = new Date(app.appliedDate);
        return appliedDate >= sevenDaysAgo && appliedDate <= today;
      };

      filteredApplications = {
        interviewAppL: this.allApplications().interviewAppL.filter(filterByWeek),
        appliedAppL: this.allApplications().appliedAppL.filter(filterByWeek),
        offerAppL: this.allApplications().offerAppL.filter(filterByWeek),
        rejectedAppL: this.allApplications().rejectedAppL.filter(filterByWeek),
        GhostedAppL: this.allApplications().GhostedAppL.filter(filterByWeek),
      };
    }

    this.applications.set(filteredApplications);
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
        this.allApplications.set(categorized);
      },
      error: (error: any) => {
        if (this.errorHandler.handleUnauthorizedError(error)) return;
        console.error(error);
      },
    });
  }
}
