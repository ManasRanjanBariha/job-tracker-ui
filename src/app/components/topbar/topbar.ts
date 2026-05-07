import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  @Output() addApplication = new EventEmitter<void>();

  onAddApp() {
    this.addApplication.emit();
  }
}
