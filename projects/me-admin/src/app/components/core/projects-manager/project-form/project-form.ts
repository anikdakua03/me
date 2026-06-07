import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { Project, ProjectCategories } from 'shared';

@Component({
  selector: 'app-project-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<ProjectForm>);
  protected readonly data = inject<Project | null>(MAT_DIALOG_DATA);

  projectForm!: FormGroup;
  isEditMode = false;

  readonly projectCategories = ProjectCategories;

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categories: [[], Validators.required],
      imageUrl: ['', Validators.required],
      tagsInput: [''],
      link: [''],
      github: ['', Validators.required]
    });

    if (this.isEditMode && this.data) {
      this.hydrateFormFields(this.data);
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;

      const result = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        imageUrl: formValue.imageUrl,
        tags: formValue.tagsInput.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag),
        link: formValue.link,
        github: formValue.github
      };

      this.dialogRef.close(result);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private hydrateFormFields(project: Project): void {
    this.projectForm.patchValue({
      title: project.title,
      description: project.description,
      category: project.categories,
      imageUrl: project.imageUrl,
      tagsInput: project.tags?.join(', ') || '',
      link: project.link,
      github: project.github
    });
  }
}
