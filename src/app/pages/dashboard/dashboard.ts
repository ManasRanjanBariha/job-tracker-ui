import { Component } from '@angular/core';
import { Topbar } from '../../components/topbar/topbar';
import { Sidebar } from '../../components/sidebar/sidebar';
import { StatRow } from '../../components/stat-row/stat-row';
import { DashboardCard } from '../../components/dashboard-card/dashboard-card';
import { CommonModule } from '@angular/common';
import { ApplicationTable } from '../../components/application-table/application-table';
import { ApplicationChart } from '../../components/application-chart/application-chart';
import {ApplicationFunnel} from '../../components/application-funnel/application-funnel';
import { UpcomingInterviewList } from '../../components/upcoming-interview-list/upcoming-interview-list';
import { GoalCard } from '../../components/goal-card/goal-card';
import { QuickActionCard } from '../../components/quick-action-card/quick-action-card';
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
    QuickActionCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  applications = [
    {
      company: 'Google',
      position: 'Software Engineer',
      status: 'Applied',
      date: '2026-03-01',
    },
    {
      company: 'Amazon',
      position: 'Backend Developer',
      status: 'Interviewing',
      date: '2026-02-25',
    },
    {
      company: 'Microsoft',
      position: 'Full Stack Developer',
      status: 'Offer Received',
      date: '2026-02-20',
    },
    {
      company: 'Facebook',
      position: 'Data Scientist',
      status: 'Rejected',
      date: '2026-02-15',
    },
    {
      company: 'Apple',
      position: 'iOS Developer',
      status: 'Applied',
      date: '2026-02-10',
    },
  ];
}
