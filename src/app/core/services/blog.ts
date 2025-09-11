import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';
import { Blog } from '../../models/blog';
import { ApiPost } from '../../models/api-post';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private storageKey = 'blogapp/blogs';
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getAllBlogs(): Observable<Blog[]> {
    if (!this.isBrowser()) return of([]);

    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      // ✅ Already seeded → return local
      return of(JSON.parse(stored));
    }

    // ❌ Not seeded → fetch from API and save
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
      ),
      tap(mappedBlogs =>
        localStorage.setItem(this.storageKey, JSON.stringify(mappedBlogs))
      )
    );
  }

  getBlogById(id: number): Observable<Blog | undefined> {
    return this.getAllBlogs().pipe(
      map(blogs => blogs.find(b => b.id === id))
    );
  }
}

export default BlogService;