import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService, Project, SnackbarService } from 'shared';
import { ProjectManagerService } from '../../../services/project-manager-service';
import { ProjectDetail } from './project-detail/project-detail';
import { ProjectForm } from './project-form/project-form';

@Component({
  selector: 'app-projects-manager',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './projects-manager.html',
  styleUrl: './projects-manager.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsManager {
  private readonly projectManagerService = inject(ProjectManagerService);
  private readonly dialog = inject(MatDialog);
  private readonly snackbarService = inject(SnackbarService);
  private readonly loaderService = inject(LoaderService);

  readonly projects = signal<Project[]>([]);

  readonly isLoading = this.loaderService.isLoading;

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loaderService.show();

    this.projectManagerService.getAll().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.snackbarService.success('Project/s loaded successfully!');
        this.loaderService.hide();
      },
      error: (error) => {
        this.snackbarService.error('Error loading projects');
        this.loaderService.hide();
      }
    });
  }

  openAddProjectDialog(): void {
    const dialogRef = this.dialog.open<ProjectForm, any, Project>(ProjectForm, {
      width: '500px',
      data: null,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loaderService.show();

        this.projectManagerService.add(result).subscribe({
          next: () => {
            this.snackbarService.success('Project added successfully!');
            this.loadProjects();
            this.loaderService.hide();
          },
          error: (error) => {
            this.loaderService.hide();
            console.error('Error adding project:', error);
            this.snackbarService.error('Error adding project');
          }
        });
      }
    });
  }

  openEditProjectDialog(project: Project): void {
    const dialogRef = this.dialog.open(ProjectForm, {
      width: '500px',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && project.id) {
        this.loaderService.show();

        this.projectManagerService.update(project.id, result).subscribe({
          next: () => {
            this.snackbarService.success('Project updated successfully!');
            this.loadProjects();
            this.loaderService.hide();
          },
          error: (error) => {
            this.loaderService.hide();
            console.error('Error updating project:', error);
            this.snackbarService.error('Error updating project');
          }
        });
      }
    });
  }

  openProjectDetails(project: Project): void {
    this.dialog.open(ProjectDetail, {
      width: '600px',
      data: project
    });
  }

  deleteProject(project: Project): void {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      if (project.id) {
        this.loaderService.show();

        this.projectManagerService.delete(project.id).subscribe({
          next: () => {
            this.snackbarService.success('Project deleted successfully!');
            this.loadProjects();
            this.loaderService.hide();
          },
          error: (error) => {
            this.loaderService.hide();
            console.error('Error deleting project:', error);
            this.snackbarService.error('Error deleting project');
          }
        });
      }
    }
  }
}
