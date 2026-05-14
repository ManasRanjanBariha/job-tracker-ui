import { Component, EventEmitter, inject, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  @Output() addApplication = new EventEmitter<void>();
  @Input() isEditMode = false;

  onAddApp() {
    this.addApplication.emit();
  }
}
