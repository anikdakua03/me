import { Injectable } from '@angular/core';
import { FirestoreService, MessageDetail, TABLES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class MessageManagerService extends FirestoreService<MessageDetail> {
  protected override collectionPath: string = TABLES.Messages;
}
