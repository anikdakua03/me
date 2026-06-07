import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  readonly isLoading = signal(false);

  public show(): void {
    this.isLoading.set(true);
  }

  public hide(): void {
    this.isLoading.set(false);
  }

  public toggle(state: boolean): void {
    this.isLoading.set(state);
  }
}