import { Component, Input } from '@angular/core';
import { ApplicationTable } from '../application-table/application-table';

@Component({
  selector: 'app-dashboard-card',
  imports: [ApplicationTable],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.scss',
})
export class DashboardCard {
  @Input() title = 'Dashboard Card';
  @Input() actionText = '';
}
