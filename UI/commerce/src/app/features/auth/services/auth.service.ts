import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../../user/models/user.model";



@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  baseUrl: string = 'http://localhost:8080/api'
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  getUser() {
    return this.user;
  }

  getUserInfo() {
    // @ts-ignore
    return this.userSubject.value.user;
  }

  public get userInfo() {
    // @ts-ignore
    return this.userSubject.value.user;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/Login`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  register(username: string, password: string, email: string, firstName: string, lastName: string) {
    return this.http.post<any>(`${this.baseUrl}/Login/register`, { username, password, email, firstName, lastName })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
  public isUserLoggedIn() {
    const user = this.userValue;
    if (user) {
      // logged in so return true
      return true;
    } else {
      return false;
    }
  }
}
