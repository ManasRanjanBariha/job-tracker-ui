import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path:'',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path:'kanban',
        loadComponent: () => import('./pages/kanban-board/kanban-board').then(m => m.KanbanBoard)
    }
];
