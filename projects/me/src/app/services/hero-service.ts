import { Injectable, signal } from '@angular/core';
import { FirestoreService, HeroSection, TABLES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class HeroService extends FirestoreService<HeroSection> {
  protected override collectionPath: string = TABLES.Profiles;

  readonly profiles = signal<HeroSection[]>([]);
}
