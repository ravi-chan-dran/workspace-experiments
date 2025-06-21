import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
    <section id="home" class="hero" appReveal>
      <h1>ZenOfIdeas</h1>
      <h2>Where Creativity Meets AI</h2>
      <button>Explore Pose Director</button>
    </section>
  `,
  styles: [
    `
      .hero {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(120deg, #222, #444);
        text-align: center;
        color: #fff;
      }
      h1 {
        font-size: 4rem;
        margin: 0;
      }
      h2 {
        font-size: 1.5rem;
        font-weight: 300;
        margin-bottom: 2rem;
      }
      button {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `
  ]
})
export class HeroComponent {

}
