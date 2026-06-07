import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { HeroSection } from 'shared';

@Component({
  selector: 'app-profile-detail',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './profile-detail.html',
  styleUrl: './profile-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDetail {
  private readonly dialogRef = inject(MatDialogRef<ProfileDetail>);
  protected readonly profileData = inject<HeroSection | null>(MAT_DIALOG_DATA);

  closeDialog(): void {
    this.dialogRef.close();
  }
}
