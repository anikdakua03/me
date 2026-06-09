import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FA_ICONS, HeroSection, SnackbarService } from 'shared';
import { HeroService } from '../../services/hero-service';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, RouterLink, MatIconModule, FontAwesomeModule],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly heroService = inject(HeroService);
  private readonly snackbarService = inject(SnackbarService);

  readonly profiles = signal<HeroSection[]>([]);

  readonly filteredProfile = computed(() => {
    const profileData = this.profiles();

    return profileData.length > 0 ? profileData[0] : null;
  });

  readonly icons = FA_ICONS;
  readonly isLoading = signal(false);

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.isLoading.set(true);

    this.heroService.getAll().subscribe({
      next: (profileData) => {
        this.profiles.set(profileData);

        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading profileData:', error);
        this.snackbarService.error('Error loading profileData');
        this.isLoading.set(false);
      },
    });
  }
}
