import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map } from 'rxjs';
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

  readonly activeCategory = signal<string>('All');

  readonly projects = signal<Project[]>([]);

  readonly isLoading = this.loaderService.isLoading;

  readonly filteredProjects = computed(() => {
    const category = this.activeCategory();

    switch (category) {
      case 'Active':
        return this.projects().filter(project => project.isDeleted === false && project.isActive);

      case 'InActive':
        return this.projects().filter(project => project.isDeleted || project.isActive === false);

      case 'Removed':
        return this.projects().filter(project => project.isDeleted);

      default:
        return this.projects();
    }
  });

  readonly filters = ['All', 'Active', 'InActive', 'Removed'];

  ngOnInit(): void {
    this.loadProjects();
  }

  selectCategory(category: string): void {
    this.activeCategory.set(category);
  }

  loadProjects(): void {
    this.loaderService.show();

    this.projectManagerService.getAll().pipe(map((data) => {
      // transform the message data to convert the date to ts date
      return data.map(project => {
        const fireCreatedDate = project.createdAt as any;
        const fireUpdatedDate = project.updatedAt as any;
        return {
          ...project,
          // Convert the nested seconds property into a real TS Date
          createdAt: new Date(fireCreatedDate.seconds * 1000),
          updatedAt: new Date(fireUpdatedDate.seconds * 1000)
        };
      });
    })).subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.snackbarService.success('Project/s loaded successfully!');
        this.loaderService.hide();
      },
      error: (error) => {
        console.error('error proj', error);
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

        // update the dates
        result.isDeleted = false;
        result.createdAt = new Date();
        result.updatedAt = new Date();

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
    const dialogRef = this.dialog.open<ProjectForm, any, Project>(ProjectForm, {
      width: '500px',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && project.id) {
        this.loaderService.show();

        // update the dates
        result.updatedAt = new Date();

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
    this.dialog.open<ProjectDetail, any, Project>(ProjectDetail, {
      width: '600px',
      data: project
    });
  }

  deleteProject(project: Project): void {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {

      if (project.isActive) {
        this.snackbarService.error('Cannot delete an active project which is currently being shown in the portfolio.');
        return;
      }

      if (project.id) {
        this.loaderService.show();

        // this.projectManagerService.delete(project.id).subscribe({
        //   next: () => {
        //     this.snackbarService.success('Project deleted successfully!');
        //     this.loadProjects();
        //     this.loaderService.hide();
        //   },
        //   error: (error) => {
        //     this.loaderService.hide();
        //     console.error('Error deleting project:', error);
        //     this.snackbarService.error('Error deleting project');
        //   }
        // });

        // update the properties
        project.isActive = false;
        project.isDeleted = true;
        project.updatedAt = new Date();

        this.projectManagerService.update(project.id, project).subscribe({
          next: () => {
            this.snackbarService.success('Project has been marked as inactive !!');
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
    }
  }
}
