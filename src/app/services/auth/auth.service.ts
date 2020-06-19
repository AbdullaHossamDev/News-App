import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(userData){
    return this.http.post<any>(`${this.baseUrl}/register`, userData, {observe: 'response'})
  }

  login(userData){
    return this.http.post<any>(`${this.baseUrl}/login`, userData,{observe: 'response'})
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    // this.router.navigate(['/auth']);
  }
}
