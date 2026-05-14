import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-funnel',
  imports: [CommonModule],
  templateUrl: './application-funnel.html',
  styleUrl: './application-funnel.scss',
})
export class ApplicationFunnel {
  private _data = signal<any>(null);

  get funnelData() {
    return this._data();
  }

  @Input() 
  set funnelData(value: any) {
    // console.log('Funnel data SETTER called with:', value);
    this._data.set(value);
    // console.log('Funnel data after setting:', this._data());
  }
  
  constructor() {
    
  }

  calculatePercentage(count: number | undefined, total: number | undefined): string {
    if (count === undefined || total === undefined || total === 0) {
      return '0%';
    }
    const percentage = (count / total) * 100;
    return `${percentage.toFixed(1)}%`;
  }
}
