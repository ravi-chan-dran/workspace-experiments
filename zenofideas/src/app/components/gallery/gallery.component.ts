import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { TrendingService, TrendingImage } from '../../services/trending.service';

@Component({
  selector: 'app-gallery',
  template: `
    <section id="gallery" class="gallery" appReveal>
      <div class="masonry">
        <div class="item" *ngFor="let img of images">
          <img [src]="img.original_url" [alt]="img.thumbnail_url" />
        </div>
      </div>
      <div #loadMoreAnchor class="loading-anchor"></div>
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
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        display: block;
      }
      @media (max-width: 768px) {
        .masonry {
          column-count: 2;
        }
      }
      .loading-anchor {
        height: 1px;
      }
    `
  ]
})
export class GalleryComponent implements OnInit, OnDestroy {
  images: TrendingImage[] = [];

  @ViewChild('loadMoreAnchor', { static: true }) anchor!: ElementRef<HTMLDivElement>;

  private observer?: IntersectionObserver;
  private seed = Math.floor(Math.random() * 1000);
  private start = 0;
  private readonly limit = 10;
  private loading = false;

  constructor(private trendingService: TrendingService) {}

  ngOnInit(): void {
    this.loadMore();
    this.setupObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.loadMore();
      }
    });
    this.observer.observe(this.anchor.nativeElement);
  }

  loadMore(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.trendingService
      .getTrending(this.seed, this.start, this.limit)
      .subscribe(data => {
        this.images = [...this.images, ...data];
        this.start += this.limit;
        this.loading = false;
      });
  }
}
