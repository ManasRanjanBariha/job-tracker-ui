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
import {AppDatePipe} from '../../shared/pipes/app-date.pipe';
@Component({
  selector: 'app-kanban-board',
  imports: [
    Topbar,Sidebar,StatRow,CommonModule,LacPipe,AppDatePipe
  ],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
})
export class KanbanBoard {

  router = inject(Router);
  storageService = inject(StorageService)
  dashboardService = inject(DashboardService);
  errorHandler = inject(ErrorHandlerService);
  applicationService = inject(ApplicationService);

  private isInitialized = false;
  applications= signal({
    interviewAppL: [] as any[],
    appliedAppL: [] as any[],
    offerAppL: [] as any[],
    rejectedAppL: [] as any[],
    GhostedAppL: [] as any[]
  });
  interviewAppL:any[] = [];
  appliedAppL:any[] = [];
  offerAppL:any[] = [];
  rejectedAppL:any[] = [];
  GhostedAppL:any[] = [];

  ngOnInit() {
    if (this.isInitialized) {
      return; // Prevent duplicate initialization
    }
    this.isInitialized = true;
      
    const user = this.storageService.get('user');
    if (!user) {
      console.log('No user logged in, redirecting to login page.');
      this.router.navigate(['/auth']);
    } else {
      this.getApplications();
    }
  }

  getApplications() {
    this.applicationService.getAllApplications().subscribe({
      next: (res:any) => {
        const applicationsData=res.jobApplications;
        const categorized = {
          interviewAppL: [] as any[],
          appliedAppL: [] as any[],
          offerAppL: [] as any[],
          rejectedAppL: [] as any[],
          GhostedAppL: [] as any[]
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
    }
    })
  }



}
