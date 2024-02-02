import {Component, NgZone, OnInit} from '@angular/core';
import {ItemService} from "../../../features/item/services/item.service";
import {Item} from "../../../features/item/models/item.model";
import {CategoryService} from "../../../features/category/services/category.service";
import {Category} from "../../../features/category/models/category.model";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  allItems: Item[] = [];
  allCategories: Category[] = [];
  currentPage: number = 1;
  pageSize: number = 5; //Paginator page size
  apiPageSize: number = 12;
  totalPages: number = 0;

  totalItemCount: number = 0;
  isCategorySelected: boolean = false;
  selectedCategoryId: string = "";
  searchTerm: string = "";
  allItemCount: number = 0;

  constructor(private itemService: ItemService,
              private categoryService: CategoryService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.getCategories();
    this.getAllItems(false);
  }

  getAllItems(isAll: boolean) {
    this.spinner.show();
    this.isCategorySelected = false;
    if(isAll) {
      this.allItems = [];
      this.currentPage = 1;
    }
    this.itemService.getAllItems(this.currentPage,this.apiPageSize).subscribe(response => {
      this.totalPages = response.totalPages;
      this.totalItemCount = response.totalCount;
      this.allItemCount = response.totalCount;
      response.response.forEach(item => {
          this.allItems.push(item);
          this.categoryService.getCategoryById(item.categoryId).subscribe(response => {
            item.currentCategory = response
          });
          this.itemService.getMainVisualById(item.id).subscribe(response => {
            item.mainVisual = response;
          })
      });
      this.spinner.hide();
    });
  }

  getItemByCategoryId(categoryId: string) {
    this.spinner.show();
    if(categoryId !== this.selectedCategoryId) {
      this.currentPage = 1;
    }
    this.allItems = [];
    this.isCategorySelected = true;
    this.selectedCategoryId = categoryId;
    this.itemService.getItemByCategoryId(this.currentPage,this.apiPageSize,categoryId).subscribe(response => {
      this.totalPages = response.totalPages;
      this.totalItemCount = response.totalCount;
      response.response.forEach(item => {
        this.allItems.push(item);
        this.categoryService.getCategoryById(item.categoryId).subscribe(response => {
          item.currentCategory = response
        });
        this.itemService.getMainVisualById(item.id).subscribe(response => {
          item.mainVisual = response;
        })
      });
      this.spinner.hide();
    });
  }
  getPageNumbers(): number[] {
    const middlePage = Math.ceil(this.pageSize / 2);

    let startPage = Math.max(1, this.currentPage - middlePage + 1);
    let endPage = Math.min(this.totalPages, startPage + this.pageSize - 1);

    if (endPage - startPage + 1 < this.pageSize) {
      startPage = Math.max(1, endPage - this.pageSize + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
    this.allItems = [];
    if(this.isCategorySelected == false && this.selectedCategoryId == "") {
      this.getAllItems(false);
    } else {
      this.getItemByCategoryId(this.selectedCategoryId);
    }

  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(response => {
      response.forEach(category => {
        this.allCategories.push(category);
        console.log(this.allCategories);
      });
    });
  }

  searchItem() {
    this.spinner.show();
    if(this.searchTerm == "") {
      this.getAllItems(false);
    }
    this.allItems = [];
    this.itemService.searchItem(this.searchTerm).subscribe(response => {
      this.totalPages = response.totalPages;
      this.totalItemCount = response.totalCount;
      response.response.forEach(item => {
        this.allItems.push(item);
        this.categoryService.getCategoryById(item.categoryId).subscribe(response => {
          item.currentCategory = response
        });
        this.itemService.getMainVisualById(item.id).subscribe(response => {
          item.mainVisual = response;
        })
      });
      this.spinner.hide();
    })
  }
}
