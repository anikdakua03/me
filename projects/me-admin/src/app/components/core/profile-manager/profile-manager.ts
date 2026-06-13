import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map } from 'rxjs';
import { HeroSection, LoaderService, SnackbarService } from 'shared';
import { AuthService } from '../../../services/auth-service';
import { ProfileManagerService } from '../../../services/profile-manager-service';
import { ProfileForm } from './profile-form/profile-form';

@Component({
  selector: 'app-profile-manager',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-manager.html',
  styleUrl: './profile-manager.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileManager implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly profileManagerService = inject(ProfileManagerService);
  private readonly loaderService = inject(LoaderService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);

  readonly user = this.authService.currentUser;
  readonly isLoading = this.loaderService.isLoading;

  readonly profileData = signal<HeroSection | null>(null);

  readonly profiles = signal<HeroSection[]>([]);

  protected profileForm!: FormGroup;

  ngOnInit(): void {
    this.loadProfileData();

    this.profileForm = this.fb.group({
      eyebrow: [''],
      headline: [''],
      subhead: [''],
      ctaLabel: [''],
      navLinks: this.fb.array([]),
      techStacks: this.fb.array([]),
      skillCategories: this.fb.array([])
    });
  }

  get navLinksFormArray() { return this.profileForm.get('navLinks') as FormArray; }
  get techStacksFormArray() { return this.profileForm.get('techStacks') as FormArray; }
  get skillCategoriesFormArray() { return this.profileForm.get('skillCategories') as FormArray; }

  getSkillItemsArray(categoryIndex: number): FormArray {
    return this.skillCategoriesFormArray.at(categoryIndex).get('items') as FormArray;
  }

  loadProfileData(): void {
    this.loaderService.show();

    this.profileManagerService.getAll().pipe(map((data) => {
      // transform the message data to convert the date to ts date
      return data.map(profile => {
        const fireCreationDate = profile.createdAt as any;
        const fireUpdatedDate = profile.updatedAt as any;
        return {
          ...profile,
          // Convert the nested seconds property into a real TS Date
          createdAt: new Date(fireCreationDate.seconds * 1000),
          updatedAt: new Date(fireUpdatedDate.seconds * 1000)
        };
      });
    })).subscribe({
      next: (profiles) => {
        if (profiles) {
          this.profiles.set(profiles);
          this.snackbarService.success('Profile/s loaded successfully!');
          this.loaderService.hide();
        }
      },
      error: (error) => {
        this.snackbarService.error('Error loading profileData');
        this.loaderService.hide();
      }
    });
  }

  openAddProfileDialog(): void {
    const dialogRef = this.dialog.open<ProfileForm, any, HeroSection>(ProfileForm, {
      width: '500px',
      data: null,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loaderService.show();

        this.profileManagerService.add(result).subscribe({
          next: () => {
            this.loaderService.hide();
            this.snackbarService.success('Profile added successfully!');
          },
          error: (error) => {
            this.loaderService.hide();
            this.snackbarService.error('Error adding profile');
          }
        });
      }
    });
  }

  openEditProjectDialog(profile: HeroSection): void {
    const dialogRef = this.dialog.open<ProfileForm, any, HeroSection>(ProfileForm, {
      width: '500px',
      data: profile
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && profile.id) {
        this.loaderService.show();

        this.profileManagerService.update(profile.id, result).subscribe({
          next: () => {
            this.snackbarService.success('Profile updated successfully!');
            this.loadProfileData();
            this.loaderService.hide();
          },
          error: (error) => {
            this.loaderService.hide();
            this.snackbarService.error('Error updating profile');
          }
        });
      }
    });
  }

  openProfileDetails(profile: HeroSection): void {
    this.dialog.open(ProfileForm, {
      width: '600px',
      data: profile
    });
  }

  /*
  Excluding the delete to prevent accidental removal
  */
  deleteProfile(profile: HeroSection): void {
    if (confirm(`Are you sure you want to delete "${profile.headline}"?`)) {
      if (profile.isActive) {
        this.snackbarService.error('Cannot delete an active profile which is currently being shown in the portfolio.');
        return;
      }

      if (profile.id) {
        this.loaderService.show();

        // this.profileManagerService.delete(profile.id).subscribe({
        //   next: () => {
        //     this.snackBar.open('Profile deleted successfully!', 'Close', { duration: 3000 });
        //     this.loadProfileData();
        //     this.loaderService.hide();
        //   },
        //   error: (error) => {
        //     this.loaderService.hide();
        //     console.error('Error deleting profile:', error);
        //     this.snackBar.open('Error deleting profile', 'Close', { duration: 3000 });
        //   }
        // });

        // update the properties
        profile.isActive = false;
        profile.isDeleted = true;
        profile.updatedAt = new Date();

        this.profileManagerService.update(profile.id, profile).subscribe({
          next: () => {
            this.snackbarService.success('Project has been marked as inactive !!');
            this.loadProfileData();
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
