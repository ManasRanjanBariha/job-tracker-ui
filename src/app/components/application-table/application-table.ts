import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-application-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-table.html',
  styleUrl: './application-table.scss',
})
export class ApplicationTable {
  @Input() applications: any[] = [];
}
