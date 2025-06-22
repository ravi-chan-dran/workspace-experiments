import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  template: `
    <section id="contact" class="contact" appReveal>
      <h2>Contact Us</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <input formControlName="name" placeholder="Name" />
        <input formControlName="email" placeholder="Email" />
        <textarea formControlName="message" placeholder="Message"></textarea>
        <button type="submit" [disabled]="form.invalid">Send</button>
      </form>
    </section>
  `,
  styles: [
    `
      .contact {
        padding: 4rem 2rem;
        text-align: center;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 400px;
        margin: 0 auto;
      }
      input, textarea {
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
      }
      button {
        padding: 0.75rem;
        border: none;
        border-radius: 4px;
        background: #333;
        color: #fff;
        cursor: pointer;
      }
      button[disabled] {
        opacity: 0.5;
        cursor: default;
      }
    `
  ]
})
export class ContactComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  submit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    }
  }
}
