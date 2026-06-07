import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/landing/landing').then(c => c.Landing)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
