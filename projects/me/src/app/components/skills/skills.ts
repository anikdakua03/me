import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { HeroSection, SkillCategory, SnackbarService, TechStackItem } from 'shared';
import { HeroService } from '../../services/hero-service';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills implements OnInit {
  private readonly heroService = inject(HeroService);
  private readonly snackbarService = inject(SnackbarService);

  readonly profiles = signal<HeroSection[]>([]);

  readonly techStacks = signal<TechStackItem[]>([]);
  readonly skillCategories = signal<SkillCategory[]>([]);

  readonly isLoading = signal(false);

  filteredProfile = computed(() => {
    const profileData = this.profiles();

    return profileData.length > 0 ? profileData[0] : null;
  });

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.isLoading.set(true);

    this.heroService.getAll().subscribe({
      next: (profileData) => {
        this.profiles.set(profileData);

        // now load tech stacks and skills
        this.loadTechStacks();
        this.loadSkillCategories();

        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading profileData:', error);
        this.snackbarService.error('Error loading profileData');
        this.isLoading.set(false);
      }
    });
  }

  loadTechStacks(): void {
    const profile = this.filteredProfile();

    if (profile !== null) {
      this.techStacks.set(profile.techStacks);
    }
  }

  loadSkillCategories(): void {
    const profile = this.filteredProfile();

    if (profile !== null) {
      this.skillCategories.set(profile.skillCategories);
    }
  }
}
