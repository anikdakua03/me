import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderService } from 'shared';

@Component({
  selector: 'app-loader',
  imports: [MatProgressBarModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  protected readonly loaderService = inject(LoaderService);
}
