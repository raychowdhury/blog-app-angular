import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../core/services/blog';
import { Blog } from '../../../models/blog';
import { Navbar } from '../../../shared/navbar/navbar';
import { RouterModule } from '@angular/router';  // 

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule,Navbar,RouterModule],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.scss']
})
export class BlogList {
  private blogService = inject(BlogService);
  blogs: Blog[] = [];
  blogs$ = this.blogService.getAllBlogs();  // observable

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data;   // ✅ assign to blogs (array)
    });
  }
}