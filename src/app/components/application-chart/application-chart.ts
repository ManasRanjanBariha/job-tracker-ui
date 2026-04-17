import { Component, Input, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-chart',
  imports: [CommonModule],
  templateUrl: './application-chart.html',
  styleUrl: './application-chart.scss',
})
export class ApplicationChart {
  chartData = signal<any[]>([]);
  
  @Input() 
  set last7MonthsData(value: any[]) {
    // console.log('Application chart SETTER called with:', value);
    const mergedData = this.mergeMonthsWithData(value || []);
    // console.log('Merged data:', mergedData);
    this.chartData.set(mergedData);
    // console.log('Chart data after setting:', this.chartData());
  }

  mergeMonthsWithData(incomingData: any[]): any[] {
    const allMonths = this.generateAll7Months();
    
    // Create a map of incoming data by month
    const dataMap = new Map();
    incomingData.forEach(item => {
      dataMap.set(item.month, item);
    });

    // Fill missing months with zero data
    return allMonths.map(monthObj => {
      const monthKey = `${String(monthObj.month).padStart(2, '0')}-${monthObj.year}`;
      const existing = dataMap.get(monthKey);
      return existing || {
        month: monthKey,
        jobs_applied: 0,
        interviews_attended: 0
      };
    });
  }

  generateAll7Months(): any[] {
    const months = [];
    const now = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        label: d.toLocaleString('default', { month: 'short', year: 'numeric' })
      });
    }

    return months.reverse();
  }

  getBarHeight(value: number, max: number): number {
  const containerHeight = 110; // match your .chart-area height in px
  if (!value || value === 0) return 4;
  if (max === 0) return 4;
  return Math.max((value / max) * containerHeight, 4);
}

  getMaxApplications(): number {
  const data = this.chartData();
  if (!data || data.length === 0) return 1;
  const max = Math.max(...data.map(d => d.jobs_applied || 0));
  return max > 0 ? max : 1; // only fallback to 1 if truly empty
}

getMaxInterviews(): number {
  const data = this.chartData();
  if (!data || data.length === 0) return 1;
  const max = Math.max(...data.map(d => d.interviews_attended || 0));
  return max > 0 ? max : 1;
}

  constructor() {}
}
