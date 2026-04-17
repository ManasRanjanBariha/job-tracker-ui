import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LacPipe } from '../../shared/pipes/lac.pipe';
import { AppDatePipe } from '../../shared/pipes/app-date.pipe';
@Component({
  selector: 'app-application-table',
  standalone: true,
  imports: [CommonModule, LacPipe, AppDatePipe],
  templateUrl: './application-table.html',
  styleUrl: './application-table.scss',
})
export class ApplicationTable {
  private _applications: any[] = [];

  @Input() 
  set applications(value: any[]) {
    // console.log('SETTER called with:', value);
    this._applications = value;
  }

  get applications(): any[] {
    return this._applications;
  }

  getStageClass(stage: string): string {
    if (!stage) return '';
    
    const stageLower = stage.toLowerCase();
    
    // Check for keywords to determine the stage class
    if (stageLower.includes('interview')) return 'interview';
    if (stageLower.includes('applied')) return 'applied';
    if (stageLower.includes('offer')) return 'offer';
    if (stageLower.includes('reject')) return 'rejected';
    
    return '';
  }
}
