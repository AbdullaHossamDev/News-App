import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
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

  getName(){
    return localStorage.getItem('userName');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');

    this.snackBar('You are logged out');
    this.router.navigate(['/home']);
  }

  snackBar(msg){
    console.log('msg: ',msg)
    this._snackBar.open(msg, '', {
      duration: 3000,
    });
  }
}
