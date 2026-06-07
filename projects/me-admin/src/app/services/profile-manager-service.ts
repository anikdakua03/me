import { Injectable } from '@angular/core';
import { FirestoreService, HeroSection, TABLES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class ProfileManagerService extends FirestoreService<HeroSection> {
  protected override collectionPath: string = TABLES.Profiles;
}
