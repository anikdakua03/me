import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HeroSection, NavLink, SkillCategory, SocialLink, SocialTypes, TechStackItem } from 'shared';

@Component({
  selector: 'app-profile-form',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonToggleModule
  ],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<ProfileForm>);
  protected readonly data = inject<HeroSection | null>(MAT_DIALOG_DATA);

  profileForm!: FormGroup;
  isEditMode = false;

  readonly socialTypes = SocialTypes;

  constructor() {
    this.isEditMode = !!this.data;
  }

  ngOnInit(): void {

    const isDisabled = false; // this.data === null || this.data?.isActive;

    this.profileForm = this.fb.group({
      displayName: new FormControl({ value: '', disabled: isDisabled }, Validators.required),
      email: new FormControl({ value: '', disabled: isDisabled }, [Validators.required, Validators.email]),
      isActive: new FormControl(true),
      eyebrow: new FormControl({ value: '', disabled: isDisabled }, Validators.required),
      headline: new FormControl({ value: '', disabled: isDisabled }, Validators.required),
      subhead: new FormControl({ value: '', disabled: isDisabled }, Validators.required),
      ctaLabel: new FormControl({ value: '', disabled: isDisabled }, Validators.required),
      ctaPath: new FormControl({ value: '/contact', disabled: isDisabled }, Validators.required),
      location: new FormControl({ value: 'India', disabled: isDisabled }, Validators.required),
      portfolioImageUrl: new FormControl({ value: null, disabled: isDisabled }),
      navLinks: this.fb.array([]),
      socialLinks: this.fb.array([]),
      techStacks: this.fb.array([]),
      skillCategories: this.fb.array([])
    });

    if (this.isEditMode && this.data && isDisabled === false) {
      this.hydrateFormFields(this.data);
    } else {
      this.loadDefaultFormStructures(isDisabled);
    }
  }

  get navLinksFormArray(): FormArray {
    return this.profileForm.get('navLinks') as FormArray;
  }

  get socialLinksFormArray(): FormArray {
    return this.profileForm.get('socialLinks') as FormArray;
  }

  get techStacksFormArray(): FormArray {
    return this.profileForm.get('techStacks') as FormArray;
  }

  get skillCategoriesFormArray(): FormArray {
    return this.profileForm.get('skillCategories') as FormArray;
  }

  getSkillItemsArray(categoryIndex: number): FormArray {
    return this.skillCategoriesFormArray.at(categoryIndex).get('items') as FormArray;
  }

  protected addNavLink(link?: NavLink, isDisabled = false): void {
    this.navLinksFormArray.push(this.fb.group({
      id: new FormControl({ value: link?.id || '', disabled: isDisabled }, Validators.required),
      label: new FormControl({ value: link?.label || '', disabled: isDisabled }, Validators.required),
      path: new FormControl({ value: link?.path || '', disabled: isDisabled }, Validators.required)
    }));
  }

  protected addSocialLink(link?: SocialLink, isDisabled = false): void {
    this.socialLinksFormArray.push(this.fb.group({
      name: new FormControl({ value: link?.name || '', disabled: isDisabled }),
      icon: new FormControl({ value: link?.icon || '', disabled: isDisabled }, Validators.required),
      url: new FormControl({ value: link?.url || '', disabled: isDisabled }, Validators.required),
      socialType: new FormControl({ value: link?.socialType || '', disabled: isDisabled }, Validators.required)
    }));
  }

  protected addTechStack(stack?: TechStackItem, isDisabled = false): void {
    this.techStacksFormArray.push(this.fb.group({
      name: new FormControl({ value: stack?.name || '', disabled: isDisabled }, Validators.required),
      icon: new FormControl({ value: stack?.icon || '', disabled: isDisabled }),
      category: new FormControl({ value: stack?.category || '', disabled: isDisabled }, Validators.required)
    }));
  }

  protected addSkillCategory(cat?: SkillCategory, isDisabled = false): void {
    const itemGroupArray = this.fb.array<FormGroup>([]);

    if (cat?.items) {
      cat.items.forEach(skill => {
        itemGroupArray.push(this.fb.group({
          name: new FormControl({ value: skill.name, disabled: isDisabled }, Validators.required),
          icon: new FormControl({ value: skill.icon || '', disabled: isDisabled }),
          category: new FormControl({ value: skill.category || '', disabled: isDisabled }, Validators.required)
        }));
      });
    }

    this.skillCategoriesFormArray.push(this.fb.group({
      title: new FormControl({ value: cat?.title || '', disabled: isDisabled }, Validators.required),
      items: itemGroupArray
    }));
  }

  protected addSkillItemToCategory(catIndex: number, isDisabled = false): void {
    this.getSkillItemsArray(catIndex).push(this.fb.group({
      name: new FormControl({ value: '', disabled: isDisabled }, Validators.required),
      icon: new FormControl({ value: '', disabled: isDisabled }),
      category: new FormControl({ value: '', disabled: isDisabled }, Validators.required)
    }));
  }

  protected removeNavLink(index: number): void {
    this.navLinksFormArray.removeAt(index);
  }

  protected removeSocialLink(index: number): void {
    this.socialLinksFormArray.removeAt(index);
  }

  protected removeTechStack(index: number): void {
    this.techStacksFormArray.removeAt(index);
  }

  protected removeSkillCategory(index: number): void {
    this.skillCategoriesFormArray.removeAt(index);
  }

  protected removeSkillItemFromCategory(catIndex: number, skillIndex: number): void {
    this.getSkillItemsArray(catIndex).removeAt(skillIndex);
  }

  private loadDefaultFormStructures(isDisabled: boolean): void {
    this.addNavLink({
      id: 'home',
      label: 'Home',
      path: '/'
    }, isDisabled);

    this.addSocialLink({
      name: '',
      icon: '',
      url: '',
      socialType: 'LinkedIn'
    }, isDisabled);

    this.addTechStack({
      name: 'Angular',
      icon: 'A',
      category: 'Framework'
    }, isDisabled);

    this.addSkillCategory({
      title: 'Frontend',
      items: [
        {
          name: 'TypeScript',
          icon: 'TS',
          category: 'Language'
        }
      ]
    }, isDisabled);
  }

  private hydrateFormFields(profile: HeroSection): void {
    this.profileForm.patchValue({
      displayName: profile.displayName,
      email: profile.email,
      isActive: profile.isActive,
      eyebrow: profile.eyebrow,
      headline: profile.headline,
      subhead: profile.subhead,
      ctaLabel: profile.ctaLabel,
      ctaPath: profile.ctaPath,
      location: profile.location,
      portfolioImageUrl: profile.portfolioImageUrl
    });

    profile.navLinks?.forEach(link => this.addNavLink(link));
    profile.socialLinks?.forEach(link => this.addSocialLink(link));
    profile.techStacks?.forEach(stack => this.addTechStack(stack));
    profile.skillCategories?.forEach(cat => this.addSkillCategory(cat));
  }

  protected onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formValues = this.profileForm.getRawValue();

    const outputPayload: HeroSection = {
      id: this.data?.id || Math.random().toString(36).substring(2, 9),
      isActive: this.data?.isActive ?? true,
      displayName: formValues.displayName,
      email: formValues.email,
      eyebrow: formValues.eyebrow,
      headline: formValues.headline,
      subhead: formValues.subhead,
      ctaLabel: formValues.ctaLabel,
      ctaPath: formValues.ctaPath,
      location: formValues.location,
      portfolioImageUrl: formValues.portfolioImageUrl,
      navLinks: formValues.navLinks,
      socialLinks: this.data?.socialLinks || [],
      techStacks: formValues.techStacks,
      skillCategories: formValues.skillCategories,
      createdAt: this.data?.createdAt || new Date(),
      updatedAt: new Date(),
      isDeleted: false
    };

    this.dialogRef.close(outputPayload);
  }

  protected closeDialog(): void {
    this.dialogRef.close(null);
  }
}
