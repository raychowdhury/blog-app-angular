import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then(m => m.Register),
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./features/all-blogs/all-blogs-routing-module').then(m => m.ALL_BLOGS_ROUTES),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile/profile').then(m => m.Profile),
  },
  { path: '', redirectTo: 'blogs', pathMatch: 'full' },
  { path: '**', redirectTo: 'blogs' },
];