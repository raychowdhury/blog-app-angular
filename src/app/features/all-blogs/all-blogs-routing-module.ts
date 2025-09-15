import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./blog-list/blog-list').then((m) => m.BlogList),
  },
  {
    path: 'create',
    loadComponent: () => import('./blog-create/blog-create').then((m) => m.BlogCreate),
  },
  {
    path: ':id',
    loadComponent: () => import('./blog-details/blog-details').then((m) => m.BlogDetails),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllBlogsRoutingModule {}
