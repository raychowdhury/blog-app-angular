// src/app/core/services/blog.service.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, map, of } from 'rxjs';
import { Blog } from '../../models/blog';
import { ApiPost } from '../../models/api-post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private storageKey = 'blogapp/blogs';

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**  Fetch blogs (API + localStorage) */
  getAllBlogs(): Observable<Blog[]> {
    if (!this.isBrowser()) return of([]);

    const localBlogs: Blog[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    return this.http.get<ApiPost[]>(this.apiUrl).pipe(
      map(posts => {
        const apiBlogs = posts.slice(0, 12).map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.body.substring(0, 100) + '...',
          content: post.body,
          author: `API User ${post.userId}`,
          publishDate: new Date(),
          date: new Date().toISOString(),
        }) as Blog);

        //  merge local blogs (user-created) with API blogs
        return [...localBlogs, ...apiBlogs];
      })
    );
  }

  /**  Get single blog (check local first, then API) */
  getBlogById(id: number): Observable<Blog | undefined> {
    if (!this.isBrowser()) return of(undefined);

    const localBlogs: Blog[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const localMatch = localBlogs.find(b => b.id === id);

    if (localMatch) return of(localMatch);

    return this.http.get<ApiPost>(`${this.apiUrl}/${id}`).pipe(
      map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.body.substring(0, 100) + '...',
        content: post.body,
        author: `API User ${post.userId}`,
        publishDate: new Date(),
        date: new Date().toISOString(),
      }) as Blog)
    );
  }

  /** Add new blog to localStorage */
  addBlog(newBlog: Blog) {
    if (!this.isBrowser()) return;

    const blogs = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    blogs.unshift(newBlog); // add to top
    localStorage.setItem(this.storageKey, JSON.stringify(blogs));
  }
}