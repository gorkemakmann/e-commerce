import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../../item/models/item.model";
import {Review} from "../models/review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl: string = 'http://localhost:8080/api'
  constructor(private http: HttpClient) { }

  getRandomReviews():Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/Review/getRandomReviews`);
  }
}
