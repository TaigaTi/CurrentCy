import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  // imports: [],
  template: `
    <div class="home-container">
      <div class="home-card">
        <div class="home-icon">💵</div>
        <h1 class="home-title">Welcome to <span>CurrentCy</span>!</h1>
        <p class="home-subtitle">Your favourite realtime currency converter</p>
        <button class="go-converter" (click)="goToConverter()">Go to Converter</button>
      </div>
    </div>
  `,
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'home-host'
  }
})
export class Home {
  private router = inject(Router);

  goToConverter() {
    this.router.navigate(['/converter']);
  }
}
