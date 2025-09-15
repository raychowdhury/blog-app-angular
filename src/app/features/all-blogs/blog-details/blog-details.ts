import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../core/services/blog';
import { Navbar } from '../../../shared/navbar/navbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AsyncPipe,
    Navbar,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './blog-details.html',
  styleUrls: ['./blog-details.scss'],
})
export class BlogDetails {
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);

  //  dynamically load blog by id from route
  blog$ = this.blogService.getBlogById(Number(this.route.snapshot.paramMap.get('id')));

  logout() {
    localStorage.removeItem('blogapp/auth'); // clear auth
    window.location.href = '/login'; // redirect to login
  }
}
