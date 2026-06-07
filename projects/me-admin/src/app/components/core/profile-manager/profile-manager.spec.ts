import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileManager } from './profile-manager';

describe('ProfileManager', () => {
  let component: ProfileManager;
  let fixture: ComponentFixture<ProfileManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileManager],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
