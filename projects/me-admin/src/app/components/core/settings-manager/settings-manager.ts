import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-settings-manager',
  imports: [CommonModule, MatCardModule],
  templateUrl: './settings-manager.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './settings-manager.scss',
})
export class SettingsManager {}
