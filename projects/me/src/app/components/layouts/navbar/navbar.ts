import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HeroSection, SnackbarService, TechStackItem } from 'shared';
import { HeroService } from '../../../services/hero-service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, OnDestroy {
  private readonly location = inject(Location);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef);
  private readonly heroService = inject(HeroService);
  private readonly snackbarService = inject(SnackbarService);

  readonly profiles = signal<HeroSection[]>([]);

  readonly techStacks = signal<TechStackItem[]>([]);

  private observer: IntersectionObserver | null = null;

  readonly filteredProfile = computed(() => {
    const profileData = this.profiles();

    return profileData.length > 0 ? profileData[0] : null;
  });

  readonly links = computed(() => {
    const profileData = this.profiles();

    return profileData.length > 0 ? profileData[0].navLinks : [];
  });

  readonly activeSection = signal('home');

  readonly menuOpen = signal(false);
  readonly darkMode = signal(this.initTheme());

  constructor() {
    effect(() => {
      const isDark = this.darkMode();
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('light-theme', !isDark);
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkInitialRouteAndScroll();
      this.initScrollObserver();
    }

    this.loadProfileData();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen()) return;

    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.menuOpen.set(false);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    const windowWidth = (event.target as Window).innerWidth;

    if (windowWidth > 980 && this.menuOpen()) {
      this.menuOpen.set(false);
    }
  }

  loadProfileData(): void {
    this.heroService.getAll().subscribe({
      next: (profileData) => {
        this.profiles.set(profileData);
      },
      error: (error) => {
        console.error('Error loading profileData:', error);
        this.snackbarService.error('Error loading profileData');
      },
    });
  }

  toggleDark(): void {
    this.darkMode.update((d) => !d);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);

    if (element) {
      const navbarHeight = 80;

      const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  }

  navigateToSection(sectionId: string): void {
    this.menuOpen.set(false);
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection.set(sectionId);
      this.updateURL(sectionId);
    }
  }

  handleMobileNavigation(sectionId: string): void {
    this.navigateToSection(sectionId);
    this.menuOpen.set(false);
  }

  private initTheme(): boolean {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private updateURL(sectionId: string): void {
    const cleanPath = sectionId === 'home' ? '/' : `/#${sectionId}`;
    this.location.go(cleanPath);
  }

  private checkInitialRouteAndScroll(): void {
    let currentPath = 'home';

    if (window.location.hash) {
      currentPath = window.location.hash.replace('#', '').toLowerCase();
    } else if (window.location.pathname && window.location.pathname !== '/') {
      currentPath = window.location.pathname.replace('/', '').toLowerCase();
    }

    const matchedLink = this.links().find((link) => link.path.toLowerCase() === currentPath);

    if (matchedLink) {
      this.activeSection.set(matchedLink.path);

      setTimeout(() => {
        this.scrollTo(matchedLink.path);
      }, 150);
    }
  }

  private initScrollObserver(): void {
    const options = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          this.activeSection.set(sectionId);
          this.updateURL(sectionId);
        }
      });
    }, options);

    this.links().forEach((link) => {
      const element = document.getElementById(link.path);
      if (element && this.observer) {
        this.observer.observe(element);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
