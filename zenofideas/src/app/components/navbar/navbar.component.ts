import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav [class.scrolled]="scrolled">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#product">Product</a>
      <a href="#gallery">Gallery</a>
      <a href="#contact">Contact</a>
    </nav>
  `,
  styles: [
    `
      nav {
        position: sticky;
        top: 0;
        display: flex;
        gap: 1rem;
        padding: 1rem 2rem;
        transition: background-color 0.3s ease;
        z-index: 10;
      }
      nav.scrolled {
        background-color: rgba(255,255,255,0.9);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      a {
        text-decoration: none;
        color: inherit;
        font-weight: 500;
      }
    `
  ]
})
export class NavbarComponent {
  scrolled = false;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 40;
  }
}
