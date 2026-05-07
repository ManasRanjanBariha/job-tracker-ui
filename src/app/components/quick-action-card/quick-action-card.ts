import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quick-action-card',
  imports: [],
  templateUrl: './quick-action-card.html',
  styleUrl: './quick-action-card.scss',
})
export class QuickActionCard {
  @Output() addApplication = new EventEmitter<void>();

  onAddApp() {
    this.addApplication.emit();
  }
}
