import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TrendingImage {
  original_url: string;
  thumbnail_url: string;
}

@Injectable({ providedIn: 'root' })
export class TrendingService {
  // Point to the local API proxy to avoid CORS issues when requesting the
  // trending endpoint. The proxy server forwards requests to the actual
  // posedirector service and adds the necessary CORS headers.
  private api = 'https://posedirector-service-601906407780.us-west4.run.app';

  constructor(private http: HttpClient) {}

  getTrending(seed = 100, start = 0, limit = 10): Observable<TrendingImage[]> {
    seed = Math.random() * 100;
    //Seed should be mad as a whole number
    seed = Math.floor(seed);
    const url = `${this.api}/trending?seed=${seed}&start=${start}&limit=${limit}`;
    return this.http.get<TrendingImage[]>(url);
  }
}
