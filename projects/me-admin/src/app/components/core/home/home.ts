import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly sidebarOpen = signal(true);
  readonly darkMode = signal(localStorage.getItem('darkMode') === 'true');

  constructor() {
    if (window.innerWidth < 768) {
      this.sidebarOpen.set(false);
    }

    // Watch dark mode changes and update document body
    effect(() => {
      const isDark = this.darkMode();
      if (isDark) {
        document.body.classList.add('dark-mode');
        document.documentElement.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.classList.remove('dark-mode');
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(state => !state);
  }

  toggleDarkMode(): void {
    this.darkMode.update(mode => {
      const newMode = !mode;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate(['/admin', route]);

    if (window.innerWidth < 768) {
      this.sidebarOpen.set(false);
    }
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout().subscribe(res => {
        this.router.navigateByUrl("/login");
      });
    }
  }
}
