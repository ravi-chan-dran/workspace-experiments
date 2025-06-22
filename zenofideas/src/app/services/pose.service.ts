import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pose {
  pose: string;
  category: string;
  image_url: string;
}

@Injectable({ providedIn: 'root' })
export class PoseService {
  constructor(private http: HttpClient) {}

  getRandomPose(): Observable<Pose> {
    return this.http.get<Pose>('/api/random-pose');
  }
}
