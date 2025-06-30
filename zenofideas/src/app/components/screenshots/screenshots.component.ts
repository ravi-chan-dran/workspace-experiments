import { Component } from '@angular/core';

@Component({
  selector: 'app-screenshots',
  template: `
    <section id="screenshots" class="screenshots" appReveal>
      <div class="shot" *ngFor="let s of shots">
        <img [src]="s.image" [alt]="s.title" />
        <h3>{{ s.title }}</h3>
        <p>{{ s.description }}</p>
      </div>
    </section>
  `,
  styles: [
    `
      .screenshots {
        padding: 4rem 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        background: #fff;
        text-align: center;
      }
      .shot img {
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
        display: block;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }
    `
  ]
})
export class ScreenshotsComponent {
  shots = [
    {
      image: 'https://via.placeholder.com/200x400?text=Screen+1',
      title: 'Home Screen',
      description: 'Overview of recent projects and updates.'
    },
    {
      image: 'https://via.placeholder.com/200x400?text=Screen+2',
      title: 'Gallery View',
      description: 'Browse your images in an easy grid.'
    },
    {
      image: 'https://via.placeholder.com/200x400?text=Screen+3',
      title: 'Pose Suggestions',
      description: 'Get recommended poses tailored to your needs.'
    },
    {
      image: 'https://via.placeholder.com/200x400?text=Screen+4',
      title: 'Profile Settings',
      description: 'Manage your account preferences quickly.'
    }
  ];
}
