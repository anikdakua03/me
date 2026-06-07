import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Project, ProjectCategories, ProjectType, SnackbarService } from 'shared';
import { ProjectService } from '../../services/project-service';

@Component({
  selector: 'app-projects',
  imports: [
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  private readonly projectService = inject(ProjectService);
  private readonly snackbarService = inject(SnackbarService);

  activeCategory = signal<ProjectType>('All');
  projects = signal<Project[]>([]);

  readonly projectCategories = ProjectCategories;

  filteredProjects = computed(() => {
    const category = this.activeCategory();

    return category === 'All'
      ? this.projects()
      : this.projects().filter((project) => project.categories.includes(category));
  });

  isLoading = signal(false);

  ngOnInit(): void {
    this.loadProjects();
  }

  selectCategory(category: string): void {
    this.activeCategory.set(category as ProjectType);
  }

  loadProjects(): void {
    this.isLoading.set(true);
    this.projectService.getAll().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.snackbarService.error('Error loading projects');
        this.isLoading.set(false);
      },
    });
  }
}
