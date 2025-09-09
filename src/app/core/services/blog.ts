import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { Blog } from '../../models/blog';
import { ApiPost } from '../../models/api-post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);   // ✅ detect if running in browser
  private storageKey = 'blogapp/blogs';
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);  // ✅ only true in browser
  }

  seedBlogs() {
    if (!this.isBrowser()) return;

    const existing = localStorage.getItem(this.storageKey);
    if (!existing) {
      this.http.get<ApiPost[]>(this.apiUrl).pipe(
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
      ).subscribe(mappedBlogs => {
        localStorage.setItem(this.storageKey, JSON.stringify(mappedBlogs));
      });
    }
  }

  getAllBlogs(): Observable<Blog[]> {
    if (!this.isBrowser()) return of([]);  // ✅ SSR safe
    const stored = localStorage.getItem(this.storageKey);
    return of(stored ? JSON.parse(stored) : []);
  }

  getBlogById(id: number): Observable<Blog | undefined> {
    return this.getAllBlogs().pipe(
      map(blogs => blogs.find(b => b.id === id))
    );
  }
}