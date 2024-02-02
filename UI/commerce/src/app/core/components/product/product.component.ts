import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Item} from "../../../features/item/models/item.model";
import {ItemService} from "../../../features/item/services/item.service";
import {ShoppingCartService} from "../../../features/shopping-cart/shopping-cart.service";
import {CategoryService} from "../../../features/category/services/category.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  item: Item = {} as Item;
  quantity: number = 0
  constructor(private route: ActivatedRoute,
              private itemService:ItemService,
              private cartService: ShoppingCartService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('id');
    this.itemService.getItemById(productIdFromRoute).subscribe(response => {
      this.item = response;
      this.categoryService.getCategoryById(this.item.categoryId).subscribe(response => {
        this.item.currentCategory = response;
      });
      this.itemService.getMainVisualById(productIdFromRoute).subscribe(response => {
        this.item.mainVisual = response;
      });
    });
    this.cartService.cartItems$.subscribe(items => {
      items.forEach(item => {
        if(item.id === productIdFromRoute) {
          this.quantity = item.quantity;
        }
      });
    });
  }
  addToCart() {
    const quantity = this.quantity;
    const cartItem = { ...this.item, quantity };
    this.cartService.addToCart(cartItem, quantity);
  }


}
