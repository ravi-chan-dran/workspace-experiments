import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section id="about" class="about" appReveal>
      <h2>About Us</h2>
      <div class="text">
        <p>ZenOfIdeas is dedicated to blending cutting-edge AI with artistic expression.</p>
        <p>Our vision is to empower photographers with intelligent tools that inspire creativity.</p>
      </div>
    </section>
  `,
  styles: [
    `
      .about {
        padding: 4rem 2rem;
        text-align: center;
      }
      .text {
        max-width: 600px;
        margin: 0 auto;
        font-size: 1.1rem;
        line-height: 1.6;
      }
    `
  ]
})
export class AboutComponent {

}
