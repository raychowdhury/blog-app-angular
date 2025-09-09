// src/app/features/all-blogs/all-blogs.routes.ts
import { Routes } from '@angular/router';
import { BlogList } from './blog-list/blog-list';

export const ALL_BLOGS_ROUTES: Routes = [
  { path: '', component: BlogList },
  {
    path: ':id',
    loadComponent: () =>
      import('./blog-details/blog-details').then(m => m.BlogDetails),
  },
];