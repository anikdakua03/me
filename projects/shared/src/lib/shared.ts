import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'shared-shared',
  imports: [],
  template: ` <p>shared works!</p> `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``,
})
export class Shared {}
