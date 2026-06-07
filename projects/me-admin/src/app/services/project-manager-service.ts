import { Injectable } from '@angular/core';
import { FirestoreService, Project, TABLES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagerService extends FirestoreService<Project> {
  protected override collectionPath: string = TABLES.Projects;
}
