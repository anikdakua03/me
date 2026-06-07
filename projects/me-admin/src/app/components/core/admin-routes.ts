import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home').then(c => c.Home),
        canActivate: [AuthGuard],
        data: {
            authGuardPipe: redirectUnauthorizedToLogin
        },
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/dashboard').then(c => c.Dashboard)
            },
            {
                path: 'projects',
                loadComponent: () => import('./projects-manager/projects-manager').then(c => c.ProjectsManager)
            },
            {
                path: 'messages',
                loadComponent: () => import('./messages-manager/messages-manager').then(c => c.MessagesManager)
            },
            {
                path: 'profile',
                loadComponent: () => import('./profile-manager/profile-manager').then(c => c.ProfileManager)
            },
            {
                path: 'settings',
                loadComponent: () => import('./settings-manager/settings-manager').then(c => c.SettingsManager)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];