import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseUrl = 'http://localhost:3000/news';

  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    return this.http.get<any>(this.baseUrl, { observe: 'response' });
  }

  getFav() {
    return this.http.get<any>(`${this.baseUrl}/fav`, { observe: 'response' });
  }

  addToFav(newData) {
    return this.http.post<any>(`${this.baseUrl}/save`, newData, { observe: 'response' });
  }

  removeFromFav(newData) {
    return this.http.delete<any>(`${this.baseUrl}/delete/${newData._id}`, { observe: 'response' });
  }
}
