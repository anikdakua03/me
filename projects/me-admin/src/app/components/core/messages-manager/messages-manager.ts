import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderService, MessageDetail, SnackbarService } from 'shared';
import { MessageManagerService } from '../../../services/message-manager-service';

@Component({
  selector: 'app-messages-manager',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './messages-manager.html',
  styleUrl: './messages-manager.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesManager implements OnInit {
  private readonly messageManagerService = inject(MessageManagerService);
  private readonly dialog = inject(MatDialog);
  private readonly loaderService = inject(LoaderService);
  private readonly snackBarService = inject(SnackbarService);

  readonly isLoading = this.loaderService.isLoading;

  readonly messages = signal<MessageDetail[]>([]);

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loaderService.show();

    this.messageManagerService.getAll().subscribe({
      next: (messages) => {
        this.messages.set(messages);
        this.snackBarService.success('message loaded successfully!');
        this.loaderService.hide();
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.snackBarService.error('Error loading messages');
        this.loaderService.hide();
      }
    });
  }

  deleteMessage(message: MessageDetail): void {
    if (confirm(`Are you sure you want to delete "${message.message}"?`)) {
      if (message.id) {
        this.loaderService.show();

        this.messageManagerService.delete(message.id).subscribe({
          next: () => {
            this.snackBarService.success('message deleted successfully!');
            this.loadMessages();
            this.loaderService.hide();
          },
          error: (error) => {
            console.error('Error deleting message:', error);
            this.snackBarService.error('Error deleting message');
            this.loaderService.hide();
          }
        });
      }
    }
  }
}
