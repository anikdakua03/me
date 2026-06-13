import { Injectable } from '@angular/core';
import { FirestoreService, Project, TABLES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagerService extends FirestoreService<Project> {
  protected collectionPath: string = TABLES.Projects;
}
