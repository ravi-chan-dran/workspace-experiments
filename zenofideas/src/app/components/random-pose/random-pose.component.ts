import { Component } from '@angular/core';
import { PoseService, Pose } from '../../services/pose.service';

@Component({
  selector: 'app-random-pose',
  template: `
    <div class="random-pose" *ngIf="pose">
      <h3>{{ pose.pose }}</h3>
      <p>{{ pose.category }}</p>
      <img [src]="pose.image_url" alt="pose" />
    </div>
    <button (click)="loadPose()">Show Me a Pose</button>
  `,
  styles: [
    `
      .random-pose {
        text-align: center;
      }
      img {
        max-width: 100%;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }
      button {
        margin-top: 1rem;
      }
    `
  ]
})
export class RandomPoseComponent {
  pose?: Pose;
  constructor(private poseService: PoseService) {}

  loadPose(): void {
    this.poseService.getRandomPose().subscribe(p => this.pose = p);
  }
}
