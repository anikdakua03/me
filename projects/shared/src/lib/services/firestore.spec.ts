import { TestBed } from '@angular/core/testing';

import { FirestoreService } from './firestore.service';

describe('Fire', () => {
  let service: FirestoreService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreService<any>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
