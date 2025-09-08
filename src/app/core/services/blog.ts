// src/app/core/services/blog.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { Blog } from '../../models/blog';
import { ApiPost } from '../../models/api-post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  private storageKey = 'blogapp/blogs';
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // ✅ Utility: check if running in browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // ✅ Fetch from API
  fetchFromApi(): Observable<Blog[]> {
    return this.http.get<ApiPost[]>(this.apiUrl).pipe(
      map(posts =>
        posts.slice(0, 12).map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.body.substring(0, 100) + '...',
          content: post.body,
          author: `API User ${post.userId}`,
          publishDate: new Date(),
          date: new Date().toISOString()
        }) as Blog)
      ),
      tap(blogs => {
        if (this.isBrowser()) {
          localStorage.setItem(this.storageKey, JSON.stringify(blogs));
        }
      })
    );
  }

  // ✅ Get blogs (first try localStorage, else API)
  getAllBlogs(): Observable<Blog[]> {
    if (this.isBrowser()) {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return of(JSON.parse(stored));
      }
    }
    return this.fetchFromApi();
  }

  getBlogById(id: number): Observable<Blog | undefined> {
    return this.getAllBlogs().pipe(
      map(blogs => blogs.find(b => b.id === id))
    );
  }
}