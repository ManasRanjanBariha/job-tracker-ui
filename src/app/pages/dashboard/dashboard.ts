import { Component, inject, OnInit, signal } from '@angular/core';
import { Topbar } from '../../components/topbar/topbar';
import { Sidebar } from '../../components/sidebar/sidebar';
import { StatRow } from '../../components/stat-row/stat-row';
import { DashboardCard } from '../../components/dashboard-card/dashboard-card';
import { CommonModule } from '@angular/common';
import { ApplicationTable } from '../../components/application-table/application-table';
import { ApplicationChart } from '../../components/application-chart/application-chart';
import { ApplicationFunnel } from '../../components/application-funnel/application-funnel';
import { UpcomingInterviewList } from '../../components/upcoming-interview-list/upcoming-interview-list';
import { GoalCard } from '../../components/goal-card/goal-card';
import { QuickActionCard } from '../../components/quick-action-card/quick-action-card';
import { StorageService } from '../../service/storage/storage-service';
import { Router } from '@angular/router';
import { DashboardService } from '../../service/dashboard/dashboard-service';
import { ErrorHandlerService } from '../../service/error-handler/error-handler.service';

interface DashboardResponse {
  dashboardData: {
    overview: {
      totalApplied: number;
      interviews: number;
      offers: number;
      responseRate: string;
      avgDaysPerStage: number;
    };
  };
}

@Component({
  selector: 'app-dashboard',
  imports: [
    Topbar,
    Sidebar,
    StatRow,
    DashboardCard,
    CommonModule,
    ApplicationTable,
    ApplicationChart,
    ApplicationFunnel,
    UpcomingInterviewList,
    GoalCard,
    UpcomingInterviewList,
    QuickActionCard,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  applications = signal<any[]>([]);
  dashboardData: DashboardResponse | null = null;
  totalApplied = 0;
  interviews = 0;
  offers = 0;
  responseRate = '0%';
  rejected = 0;
  avgDaysPerStage = 0;
  last7Months = signal<any[]>([]);
  private isInitialized = false;

  updateStats() {}

  storageService = inject(StorageService);
  router = inject(Router);
  dashboardService = inject(DashboardService);
  errorHandler = inject(ErrorHandlerService);

  constructor() {}

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
      this.getDashboardStats();
    }
  }

  // async getDashboardStats() {
  //   try {
  //     const dashboardData: any =
  //       await this.dashboardService.getDashboardStats();
  //     console.log('Dashboard Stats:', dashboardData);
  //     this.dashboardData = dashboardData;
  //     // Commenting out stats update for now since API response structure is still being finalized
  //     // this.updateStatsFromData(dashboardData.dashboardData.overview);
  //     this.updateRecentApplication(dashboardData.dashboardData);
  //   } catch (error: any) {
  //     if (this.errorHandler.handleUnauthorizedError(error)) {
  //       return;
  //     }
  //     console.error('Error fetching dashboard stats:', error);
  //   }
  // }

 getDashboardStats() {
  this.dashboardService.getDashboardStats().subscribe({
    next: (dashboardData: any) => {
      console.log('Dashboard Stats:', dashboardData);
      this.dashboardData = dashboardData;
      this.updateStatsFromData(dashboardData.dashboardData.overview);
      this.last7Months.set(dashboardData.dashboardData.lastSevenMonthsData || []);
      this.updateRecentApplication(dashboardData.dashboardData);
      console.log('Last 7 months set to:', this.last7Months());
      
    },
    error: (error: any) => {
      if (this.errorHandler.handleUnauthorizedError(error)) return;
      console.error(error);
    }
  });
}

  updateStatsFromData(data: any) {
    // console.log('Updating stats with data:', data);
    this.totalApplied = data.totalApplications?.totalApplications || 0;

    // Getting interviews, offers, response rate, and avg days per stage from the overview data
    let applicationsByStage = data.applicationsByStage || {};
    // console.log('Type of applicationsByStage:', typeof applicationsByStage, 'Value:', applicationsByStage);
    
    let applicationsWithResponse = 0;
    
    for (let appDetail of Object.values(applicationsByStage)) {
      const stage = appDetail as { stage: string; count: number };
      // console.log(stage, "Stage data", applicationsByStage)
      
      if (stage.stage.toLowerCase().includes('interview')) {
        this.interviews += stage.count;
        applicationsWithResponse += stage.count;
      }
      else if (stage.stage.toLowerCase().includes('offer')) {
        this.offers += stage.count;
        applicationsWithResponse += stage.count;
      }
      else if (stage.stage.toLowerCase().includes('rejected')) {
        this.rejected += stage.count;
        applicationsWithResponse += stage.count;
      }
    }
    
    // Calculate response rate percentage
    if (this.totalApplied > 0) {
      const responseRatePercentage = (applicationsWithResponse / this.totalApplied) * 100;
      this.responseRate = responseRatePercentage.toFixed(2) + '%';
    }
    
    console.log('Updated stats:', {
      totalApplied: this.totalApplied,
      interviews: this.interviews,
      offers: this.offers,
      responseRate: this.responseRate,
      avgDaysPerStage: this.avgDaysPerStage
    });
  }

  // UpdateRecentApplication
  updateRecentApplication(data:any) {
    this.applications.set([...(data.recentApplications || [])]);
    console.log('Updated recent applications:', this.applications());
  }
}
