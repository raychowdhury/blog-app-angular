import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class Profile implements OnInit {
  user: User | null = null;
  joinDate: string | null = null;

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const loggedInUser = localStorage.getItem('blogapp/auth');
      if (loggedInUser) {
        this.user = JSON.parse(loggedInUser);
        this.joinDate = new Date().toLocaleDateString();
      }
    } else {
      console.warn('⚠️ localStorage not available (SSR mode)');
    }
  }
}
