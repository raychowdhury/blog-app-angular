import { Routes } from '@angular/router';

export const ALL_BLOGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./blog-list/blog-list').then(m => m.BlogList),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./blog-create/blog-create').then(m => m.BlogCreate),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./blog-details/blog-details').then(m => m.BlogDetails),
  },
];