import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesManager } from './messages-manager';

describe('MessagesManager', () => {
  let component: MessagesManager;
  let fixture: ComponentFixture<MessagesManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesManager],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
