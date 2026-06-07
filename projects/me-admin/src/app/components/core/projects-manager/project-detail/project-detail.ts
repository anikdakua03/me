import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Project } from 'shared';

@Component({
  selector: 'app-project-detail',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetail {
  private readonly dialogRef = inject(MatDialogRef<ProjectDetail>);
  protected readonly projectData = inject<Project | null>(MAT_DIALOG_DATA);

  onClose(): void {
    this.dialogRef.close();
  }
}
