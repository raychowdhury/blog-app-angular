// blog-list.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../../core/services/blog';
import { Blog } from '../../../models/blog';
import { Observable } from 'rxjs';
import { Navbar } from "../../../shared/navbar/navbar";

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.scss']
})
export class BlogList implements OnInit {
  private blogService = inject(BlogService);

  blogs$!: Observable<Blog[]>;  // ✅ observable

  ngOnInit() {
    this.blogs$ = this.blogService.getAllBlogs();
  }

  logout() {
    localStorage.removeItem('blogapp/auth');
    window.location.href = '/login';
  }
}