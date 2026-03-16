import { Component } from '@angular/core';
import { StatCard } from '../stat-card/stat-card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-stat-row',
  imports: [StatCard,CommonModule],
  templateUrl: './stat-row.html',
  styleUrl: './stat-row.scss',
})
export class StatRow {
  statCardsValues = [
    {
      statTopText: 'Total Applied',
      statIcon: '📨',
      statNumText: '120',
      color: 'var(--accent)',
      value: 80,
      statFooterNumberText: '4',
      statFooterText: 'this week'
    },
    {
      statTopText: 'Interviews',
      statIcon: '💬',
      statNumText: '5',
      color: 'var(--yellow)',
      value: 50,
      statFooterNumberText: '2',
      statFooterText: 'new this week'
    },
    {
      statTopText: 'Offers',
      statIcon: '🎉',
      statNumText: '2',
      color: 'var(--green)',
      value: 40,
      statFooterNumberText: '1',
      statFooterText: 'this week'
    },
    {
      statTopText: 'Response Rate',
      statIcon: '📊',
      statNumText: '38%',
      color: '#a78bfa',
      value: 38,
      statFooterNumberText: '5%',
      statFooterText: 'vs last week'
    },
    {
      statTopText:'Avg Days/Stage',
      statIcon:'⏱',
      statNumText:'8.2',
      color:'var(--blue)',
      value: 60,
      statFooterNumberText:'-1',
      statFooterText:'day vs last week'
    }
]
}
