import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../../core/services/blog';
import { Blog } from '../../../models/blog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.scss']
})
export class BlogList {
  private blogService = inject(BlogService);
  blogs$!: Observable<Blog[]>;

  ngOnInit() {
    this.blogs$ = this.blogService.getAllBlogs();
  }
}