import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogList } from './blog-list/blog-list';

const routes: Routes = [
  { path: '', component: BlogList },
  {
    path: ':id',
    loadComponent: () =>
      import('./blog-details/blog-details').then(m => m.BlogDetails),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllBlogsRoutingModule {}