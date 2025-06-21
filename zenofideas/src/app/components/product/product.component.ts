import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  template: `
    <section id="product" class="product" appReveal>
      <h2>Pose Director</h2>
      <p>A smart assistant that suggests poses and setups for photographers.</p>
      <img src="https://via.placeholder.com/600x400?text=Product" alt="Product screenshot" />
      <app-random-pose></app-random-pose>
    </section>
  `,
  styles: [
    `
      .product {
        padding: 4rem 2rem;
        text-align: center;
      }
      img {
        max-width: 100%;
        margin: 1rem 0;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }
    `
  ]
})
export class ProductComponent {

}
