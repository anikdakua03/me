import { Component, inject, OnInit } from '@angular/core';
import { SnackbarService } from 'shared';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',

})
export class Dashboard implements OnInit {
  private readonly snackbarService = inject(SnackbarService);

  ngOnInit(): void {
  }
}