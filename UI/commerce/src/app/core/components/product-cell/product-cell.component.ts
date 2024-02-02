import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from "../../../features/item/services/item.service";
import {Item} from "../../../features/item/models/item.model";
import {CategoryService} from "../../../features/category/services/category.service";

@Component({
  selector: 'app-product-cell',
  templateUrl: './product-cell.component.html',
  styleUrls: ['./product-cell.component.css']
})
export class ProductCellComponent implements OnInit{
  @Input() product: Item = {} as Item;
  allItems: Item[] = [];
  randomItems: Item[] = [];
  @Input() isCalled: boolean = false;
  constructor(private itemService: ItemService, private categoryService:CategoryService) {
  }
  ngOnInit() {
    //this.getAllItems();
    if(!this.isCalled) {
      this.getRandomItems();
    }
  }


  getRandomItems() {
    var counter = 0;
    this.itemService.getRandomItems(3).subscribe(response => {
      response.forEach(item => {
          counter++;
          this.randomItems.push(item);
          this.categoryService.getCategoryById(item.categoryId).subscribe(response => {
            item.currentCategory = response
          });
          this.itemService.getMainVisualById(item.id).subscribe(response => {
            item.mainVisual = response;
          })
      });
    });
  }
}
