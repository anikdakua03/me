import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-skeleton',
  imports: [MatCardModule],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
})
export class Skeleton { }
