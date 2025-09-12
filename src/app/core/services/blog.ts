import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Blog } from '../../models/blog';
import { ApiPost } from '../../models/api-post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // ✅ Always fetch directly from API
  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<ApiPost[]>(this.apiUrl).pipe(
      map(posts =>
        posts.slice(0, 12).map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.body.substring(0, 100) + '...',
          content: post.body,
          author: `API User ${post.userId}`,
          publishDate: new Date(),
          date: new Date().toISOString(),
        }) as Blog)
      )
    );
  }

  // ✅ Get one blog by ID
  getBlogById(id: number): Observable<Blog | undefined> {
    return this.getAllBlogs().pipe(
      map(blogs => blogs.find(b => b.id === id))
    );
  }
}