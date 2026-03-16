import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path:'auth',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    }
];
