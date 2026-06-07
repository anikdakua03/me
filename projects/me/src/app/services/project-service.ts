import { Injectable } from '@angular/core';
import { FirestoreService, Project, TABLES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends FirestoreService<Project> {
  protected override collectionPath: string = TABLES.Projects;
}