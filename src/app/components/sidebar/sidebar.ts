import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  router = inject(Router);
  currentRoute = signal<string>('dashboard');

  constructor() {
    // Track route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const path = event.urlAfterRedirects.split('/')[1] || 'dashboard';
        this.currentRoute.set(path);
      });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    return this.currentRoute() === path;
  }
}
