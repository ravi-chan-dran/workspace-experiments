import { Component, OnInit } from '@angular/core';
import { TrendingService, TrendingImage } from '../../services/trending.service';

@Component({
  selector: 'app-gallery',
  template: `
    <section id="gallery" class="gallery" appReveal>
      <div class="masonry">
        <div class="item" *ngFor="let img of images">
          <img [src]="img.thumbnail_url" [alt]="img.original_url" />
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .masonry {
        column-count: 3;
        column-gap: 1rem;
      }
      .item {
        break-inside: avoid;
        margin-bottom: 1rem;
        position: relative;
        transition: transform 0.3s ease;
      }
      .item:hover {
        transform: translateY(-4px);
      }
      img {
        width: 100%;
        border-radius: 8px;
        display: block;
      }
      @media (max-width: 768px) {
        .masonry {
          column-count: 2;
        }
      }
    `
  ]
})
export class GalleryComponent implements OnInit {
  images: TrendingImage[] = [];

  constructor(private trendingService: TrendingService) {}

  ngOnInit(): void {
    // generate a random seed for the trending images
    const seed = Math.floor(Math.random() * 100);
    this.trendingService.getTrending(seed).subscribe(data => this.images = data);
  }
}
