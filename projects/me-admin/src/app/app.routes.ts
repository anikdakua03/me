import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./components/core/admin-routes').then(r => r.ADMIN_ROUTES)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(c => c.Login)
    },
    {
        path: '',
        redirectTo: '/admin/dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found').then(c => c.NotFound)
    }
];