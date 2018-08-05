import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { AuthData } from '../models/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticaded = false;
  private token: string;
  private authStatus: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };

    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(newUser => {
        console.log(newUser);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };

    this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        this.token = response.token;

        if (this.token) {
          this.isAuthenticaded = true;
          this.authStatus.next(true);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticaded = false;
    this.authStatus.next(false);
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatus.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticaded;
  }
}
