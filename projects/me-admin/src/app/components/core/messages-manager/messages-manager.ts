import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { map } from 'rxjs';
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
    MatSnackBarModule,
    MatExpansionModule
  ],
  templateUrl: './messages-manager.html',
  styleUrl: './messages-manager.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesManager implements OnInit {
  private readonly messageManagerService = inject(MessageManagerService);
  private readonly dialog = inject(MatDialog);
  private readonly snackbarService = inject(SnackbarService);
  private readonly loaderService = inject(LoaderService);

  readonly isLoading = this.loaderService.isLoading;

  readonly activeCategory = signal<string>('All');

  readonly messages = signal<MessageDetail[]>([]);

  readonly filteredMessages = computed(() => {
    const category = this.activeCategory();
    const isRemoved = category === 'Removed';

    return category === 'All'
      ? this.messages()
      : this.messages().filter((message) => message.isDeleted === isRemoved);
  });

  readonly filters = ['All', 'Active', 'Removed'];

  ngOnInit(): void {
    this.loadMessages();
  }

  selectCategory(category: string): void {
    this.activeCategory.set(category);
  }

  loadMessages(): void {
    this.loaderService.show();

    this.messageManagerService.getAll().pipe(map((data) => {
      // transform the message data to convert the date to ts date
      return data.map(msg => {
        const fireCreatedDate = msg.createdAt as any;
        const fireUpdatedDate = msg.updatedAt as any;
        return {
          ...msg,
          // Convert the nested seconds property into a real TS Date
          createdAt: new Date(fireCreatedDate.seconds * 1000),
          updatedAt: new Date(fireUpdatedDate.seconds * 1000)
        };
      });
    })).subscribe({
      next: (messages) => {
        this.messages.set(messages);

        this.snackbarService.success('message loaded successfully!');
        this.loaderService.hide();
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.snackbarService.error('Error loading messages');
        this.loaderService.hide();
      }
    });
  }

  deleteMessage(message: MessageDetail): void {
    if (confirm(`Are you sure you want to delete "${message.message}"?`)) {
      if (message.id) {
        this.loaderService.show();

        // this.messageManagerService.delete(message.id).subscribe({
        //   next: () => {
        //     this.snackBarService.success('message deleted successfully!');
        //     this.loadMessages();
        //     this.loaderService.hide();
        //   },
        //   error: (error) => {
        //     console.error('Error deleting message:', error);
        //     this.snackBarService.error('Error deleting message');
        //     this.loaderService.hide();
        //   }
        // });

        // update the properties
        message.isDeleted = true;
        message.updatedAt = new Date();

        this.messageManagerService.update(message.id, message).subscribe({
          next: () => {
            this.snackbarService.success('message has been marked for removal !!');
            this.loadMessages();
            this.loaderService.hide();
          },
          error: (error) => {
            this.loaderService.hide();
            console.error('Error updating message:', error);
            this.snackbarService.error('Error updating message');
          }
        });
      }
    }
  }
}
