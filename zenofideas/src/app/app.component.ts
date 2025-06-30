import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { TrendingService, TrendingImage } from './services/trending.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'zenofideas';
  private images: TrendingImage[] = [];
  private scrollListener = this.onScroll.bind(this);

  constructor(
    private trendingService: TrendingService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.trendingService.getTrending(100, 0, 5).subscribe((images) => {
      if (images.length) {
        this.images = images;
        this.updateBackground(0);
        window.addEventListener('scroll', this.scrollListener);
      }
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
  }

  private onScroll(): void {
    const max = document.body.scrollHeight - window.innerHeight;
    const frac = max ? window.scrollY / max : 0;
    this.updateBackground(frac);
  }

  private updateBackground(frac: number): void {
    if (!this.images.length) return;
    const idx = Math.min(
      this.images.length - 1,
      Math.floor(frac * (this.images.length - 1)),
    );
    const url = `url(${this.images[idx].thumbnail_url})`;
    this.renderer.setStyle(document.body, 'backgroundImage', url);
    this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
    this.renderer.setStyle(document.body, 'backgroundPosition', 'center');
    this.renderer.setStyle(
      document.body,
      'transition',
      'background-image 0.5s ease',
    );
  }
}
