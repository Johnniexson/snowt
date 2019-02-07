import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Business } from '../models/business';

const BASE_URL = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  createUser(body: User): Observable<any> {
    return this.httpClient.post<User>(`${BASE_URL}/registerUser`, body);
  }

  createBusiness(body: Business): Observable<any> {
    return this.httpClient.post<Business>(`${BASE_URL}/registerBusiness`, body);
  }

  loginUser(body: any): Observable<any> {
    return this.httpClient.post<any>(`${BASE_URL}/login`, body);
  }

  loginBusiness(body: any): Observable<any> {
    return this.httpClient.post<any>(`${BASE_URL}/loginBusiness`, body);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/blog']);
  }
  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<User>(`${BASE_URL}/profile/${token}`);
  }
}
