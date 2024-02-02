import { Injectable } from '@angular/core';
import {AddCategoryRequest} from "../models/add-category-request.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category.model";
import {Item} from "../../item/models/item.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = 'http://localhost:8080/api'
  constructor(private http: HttpClient) { }

  addCategory(model:AddCategoryRequest):Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/Categories`, model);
  }

  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/Categories/${categoryId}`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/Categories`);
  }
}
