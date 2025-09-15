import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../core/services/blog';
import { Blog } from '../../../models/blog';
import { Navbar } from '../../../shared/navbar/navbar';
import { RouterModule } from '@angular/router'; //
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, Navbar, RouterModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.scss'],
})
export class BlogList implements OnInit {
  private blogService = inject(BlogService);
  blogs: Blog[] = [];
  blogs$ = this.blogService.getAllBlogs(); // observable

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe((data) => {
      this.blogs = data; // ✅ assign to blogs (array)
    });
  }
}
