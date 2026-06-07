import { Injectable } from '@angular/core';
import { FirestoreService, MessageDetail, TABLES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends FirestoreService<MessageDetail> {
  protected override collectionPath: string = TABLES.Messages;
}
