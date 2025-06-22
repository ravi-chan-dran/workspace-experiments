import { Component, OnInit, Renderer2 } from '@angular/core';
import { TrendingService } from './services/trending.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zenofideas';

  constructor(private trendingService: TrendingService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.trendingService.getTrending().subscribe(images => {
      if (images.length) {
        const url = `url(${images[0].thumbnail_url})`;
        this.renderer.setStyle(document.body, 'backgroundImage', url);
        this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
        this.renderer.setStyle(document.body, 'backgroundPosition', 'center');
      }
    });
  }
}
