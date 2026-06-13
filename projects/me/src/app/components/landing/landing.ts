import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Contact } from '../contact/contact';
import { Footer } from '../footer/footer';
import { Hero } from '../hero/hero';
import { Skeleton } from "../layouts/skeleton/skeleton";
import { Projects } from '../projects/projects';
import { Skills } from '../skills/skills';

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    Hero,
    Skills,
    Projects,
    Contact,
    Footer,
    MatIcon,
    Skeleton
  ],
  templateUrl: './landing.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './landing.scss',
})
export class Landing {
  readonly showScrollUp = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
    this.showScrollUp.set(scrollPosition > 300);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
