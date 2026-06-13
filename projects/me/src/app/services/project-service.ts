import { Injectable } from '@angular/core';
import { FirestoreService, Project, TABLES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends FirestoreService<Project> {
  protected collectionPath: string = TABLES.Projects;
}