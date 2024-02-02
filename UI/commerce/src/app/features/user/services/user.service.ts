import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../../review/models/review.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl: string = 'http://localhost:8080/api'
  constructor(private http: HttpClient) { }

  getUserById(id:string):Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/User/${id}`);
  }
}
