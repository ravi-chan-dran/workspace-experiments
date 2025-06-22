import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TrendingImage {
  original_url: string;
  thumbnail_url: string;
}

@Injectable({ providedIn: 'root' })
export class TrendingService {
  private api = 'https://posedirector-service-601906407780.us-west4.run.app';

  constructor(private http: HttpClient) {}

  getTrending(seed = 100, start = 2, limit = 10): Observable<TrendingImage[]> {
    const url = `${this.api}/trending?seed=${seed}&start=${start}&limit=${limit}`;
    return this.http.get<TrendingImage[]>(url);
  }
}
