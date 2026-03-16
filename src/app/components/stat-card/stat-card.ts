import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {
  @Input() statTopText!: string;
  @Input() statIcon!: string;
  @Input() statNumText!: string;
  @Input() color!: string;
  @Input() value!: number;
  @Input() statFooterNumberText!: string;
  @Input() statFooterText!: string;
}
