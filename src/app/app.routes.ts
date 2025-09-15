import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./features/all-blogs/all-blogs-module').then((m) => m.AllBlogsModule),
  },

  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile/profile').then((m) => m.Profile),
  },
  {
    path: 'contact',
    loadChildren: () => import('./features/contact/contact-module').then((m) => m.ContactModule),
  },
  { path: '', redirectTo: 'blogs', pathMatch: 'full' },
  { path: '**', redirectTo: 'blogs' },
];
