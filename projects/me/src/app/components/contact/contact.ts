import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FA_ICONS, HeroSection, MessageDetail, SnackbarService, SocialLink } from 'shared';
import { HeroService } from '../../services/hero-service';
import { MessageService } from '../../services/message-service';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly heroService = inject(HeroService);
  private readonly snackbarService = inject(SnackbarService);

  readonly icons = FA_ICONS;
  readonly isLoading = signal(false);

  readonly profiles = signal<HeroSection[]>([]);

  readonly socialLinks = signal<SocialLink[]>([]);

  readonly filteredProfile = computed(() => {
    const profileData = this.profiles();

    return profileData.length > 0 ? profileData[0] : null;
  });

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submitting = signal(false);

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.isLoading.set(true);

    this.heroService.getAll().subscribe({
      next: (profileData) => {
        this.profiles.set(profileData);

        // now load links
        this.loadSocialLinks();

        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading profileData:', error);
        this.snackbarService.error('Error loading profileData');
        this.isLoading.set(false);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    const { name, email, message } = this.form.value;

    const msg: MessageDetail = {
      name: name || '',
      email: email || '',
      message: message || '',
      createdAt: new Date()
    };

    this.messageService.add(msg).subscribe({
      next: () => {
        this.submitting.set(false);
        this.snackbarService.success('Message sent successfully! I\'ll get back to you soon.', 4000);

        this.form.reset();
      },
      error: (err) => {
        this.submitting.set(false);
        console.error('Error sending message:', err);
        this.snackbarService.error('Error sending message. Please try again.', 4000);
      },
    });
  }

  loadSocialLinks(): void {
    const profile = this.filteredProfile();

    if (profile !== null) {
      this.socialLinks.set(profile.socialLinks);
    }
  }
}
