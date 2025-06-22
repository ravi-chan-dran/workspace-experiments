import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <p>© 2025 ZenOfIdeas · All Rights Reserved</p>
      <div class="links">
        <a href="https://instagram.com" target="_blank">Instagram</a>
        <a href="https://linkedin.com" target="_blank">LinkedIn</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms</a>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        padding: 2rem;
        text-align: center;
        background: #f5f5f5;
      }
      .links {
        margin-top: 0.5rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
    `
  ]
})
export class FooterComponent {

}
