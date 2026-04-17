import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StatCard } from '../stat-card/stat-card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-stat-row',
  imports: [StatCard,CommonModule],
  templateUrl: './stat-row.html',
  styleUrl: './stat-row.scss',
})
export class StatRow implements OnChanges {

  @Input() totalApplied!: number;
  @Input() interviews!: number;
  @Input() offers!: number;
  @Input() responseRate!: string;
  @Input() avgDaysPerStage!: number;

  statCardsValues: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    this.statCardsValues = [
      {
        statTopText: 'Total Applied',
        statIcon: '📨',
        statNumText: '' + this.totalApplied,
        color: 'var(--accent)',
        value: 80,
        statFooterNumberText: '4',
        statFooterText: 'this week'
      },
      {
        statTopText: 'Interviews',
        statIcon: '💬',
        statNumText: '' + this.interviews,
        color: 'var(--yellow)',
        value: 50,
        statFooterNumberText: '2',
        statFooterText: 'new this week'
      },
      {
        statTopText: 'Offers',
        statIcon: '🎉',
        statNumText: '' + this.offers,
        color: 'var(--green)',
        value: 40,
        statFooterNumberText: '1',
        statFooterText: 'this week'
      },
      {
        statTopText: 'Response Rate',
        statIcon: '📊',
        statNumText: this.responseRate || '0%',
        color: '#a78bfa',
        value: 38,
        statFooterNumberText: '5%',
        statFooterText: 'vs last week'
      },
      {
        statTopText:'Avg Days/Stage',
        statIcon:'⏱',
        statNumText:'' + this.avgDaysPerStage,
        color:'var(--blue)',
        value: 60,
        statFooterNumberText:'-1',
        statFooterText:'day vs last week'
      }
    ];
  }
}