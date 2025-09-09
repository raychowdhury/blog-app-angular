// src/app/features/all-blogs/blog-details/blog-details.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../../core/services/blog';
import { Blog } from '../../../models/blog';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-details.html',
  styleUrls: ['./blog-details.scss']
})
export class BlogDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  blog?: Blog;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // get id from URL
    this.blogService.getBlogById(id).subscribe(blog => {
      this.blog = blog;

      if (!this.blog) {
        console.warn(`❌ Blog with id ${id} not found`);
      }
    });
  }
}