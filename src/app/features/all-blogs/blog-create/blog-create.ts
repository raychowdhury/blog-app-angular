import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { BlogService } from '../../../core/services/blog';
import { Router, RouterModule } from '@angular/router';
import { Blog } from '../../../models/blog';
import { Navbar } from "../../../shared/navbar/navbar";
import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    Navbar,
    RouterModule
  ],
  templateUrl: './blog-create.html',
  styleUrl: './blog-create.scss'
})
export class BlogCreate {



  private blogService = inject(BlogService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    content: new FormControl('', [Validators.required, Validators.minLength(20)]),
    excerpt: new FormControl(''),
  });
  onSubmit() {
    if (this.blogForm.valid) {
      const newBlog: Blog = {
        id: Date.now(),
        title: this.blogForm.value.title!,
        content: this.blogForm.value.content!,
        excerpt: this.blogForm.value.excerpt || this.blogForm.value.content!.substring(0, 100) + '...',
        author: 'Demo User',  // later replace with logged-in user
        publishDate: new Date(),
        date: new Date().toISOString()
      };

      this.blogService.addBlog(newBlog);

      this.snackBar.open('Blog created successfully 🎉', 'Close', { duration: 3000 });
      this.router.navigate(['/blogs']);
    } else {
      this.blogForm.markAllAsTouched();
      this.snackBar.open('Please fill all fields ❌', 'Close', { duration: 3000 });
    }
  }


}
