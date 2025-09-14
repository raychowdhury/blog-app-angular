import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   // ✅ import RouterModule
import { AsyncPipe } from '@angular/common';
import { BlogService } from '../../../core/services/blog';
import { Navbar } from "../../../shared/navbar/navbar";

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe, Navbar],  // ✅ RouterModule here
  templateUrl: './blog-details.html',
  styleUrls: ['./blog-details.scss']
})
export class BlogDetails {
  private blogService = inject(BlogService);
  blog$ = this.blogService.getBlogById(2); // example
  logout() {
  localStorage.removeItem('blogapp/auth');  // or however you track login
  window.location.href = '/login';         // redirect to login
}
}
