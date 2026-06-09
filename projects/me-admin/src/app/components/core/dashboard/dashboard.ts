import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SnackbarService } from 'shared';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly snackbarService = inject(SnackbarService);

  ngOnInit(): void {}
}
