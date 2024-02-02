import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../../item/models/item.model";
import {Coupon} from "../models/coupon.model";
import {CreateOrder} from "../models/createOrder.model";
import {OrderLine} from "../models/orderLine.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  user = localStorage.getItem('user');
  token = "";
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.token}`
  });

  baseUrl: string = 'http://localhost:8080/api'
  constructor(private http: HttpClient) {
    const userDataString = localStorage.getItem('user');

    if (userDataString) {
      // Parse the JSON string to get the user object
      const userData = JSON.parse(userDataString);

      // Access the token property
      this.token = userData.token;
    } else {
      console.error('User data not found in localStorage');
    }
  }

  getCoupon(couponCode: string | null):Observable<Coupon> {
    return this.http.get<Coupon>(`${this.baseUrl}/Order/checkCoupon?couponCode=${couponCode}`, { headers: this.headers });
  }

  createOrder(order: CreateOrder): Observable<OrderLine[]> {
    return this.http.post<OrderLine[]>(`${this.baseUrl}/Order/createOrder`,order, { headers: this.headers });
  }

}
