import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../core/services/blog';
import { Blog } from '../../../models/blog';
import { Navbar } from '../../../shared/navbar/navbar';
import { RouterModule } from '@angular/router'; //
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.scss'],
})
export class BlogList implements OnInit {
  private blogService = inject(BlogService);
  blogs: Blog[] = [];
  pagedBlogs: Blog[] = [];
  pageSize = 6;
  pageIndex = 0;

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe((data) => {
      this.blogs = data;
      this.updatePage();
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  private updatePage() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedBlogs = this.blogs.slice(start, end);
  }
}
