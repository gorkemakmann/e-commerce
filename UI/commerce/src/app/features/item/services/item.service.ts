import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../models/item.model";
import {ItemVisual} from "../../models/item-visual.model";
import {ResponseModel} from "../../models/response.model";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
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

  getAllItems(pageNumber: number, pageSize: number):Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.baseUrl}/Item/getAllItems?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getRandomItems(count: number):Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/Item/getRandomItems?count=${count}`);
  }

  getItemById(id: string | null):Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/Item/${id}`, { headers: this.headers });
  }

  getItemByCategoryId(pageNumber:number, pageSize: number, categoryId: string | null):Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.baseUrl}/Item/getByCategory/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}`, { headers: this.headers });
  }

  searchItem(searchTerm: string | null):Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.baseUrl}/Item/search?searchTerm=${searchTerm}`, { headers: this.headers });
  }

  getMainVisualById(id: string | null): Observable<ItemVisual> {
    return this.http.get<ItemVisual>(`${this.baseUrl}/Item/mainVisual/${id}`)
  }
}
