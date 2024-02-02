import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Item} from "../item/models/item.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItems = new BehaviorSubject<Item[]>([]);
  cartItems$ = this.cartItems.asObservable();
  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems.next(JSON.parse(storedCart));
    }
  }

  addToCart(itemToAdd: Item,quantity: number) {
    const currentCart = this.cartItems.value;

    // Check if the item is already in the cart
    const existingItemIndex = currentCart.findIndex(item => item.id === itemToAdd.id);

    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update the quantity
      const updatedCart = currentCart.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + quantity };
        } else {
          return item;
        }
      });

      this.cartItems.next(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // If the item is not in the cart, add it as a new item with the specified quantity
      const newCart = [...currentCart, { ...itemToAdd, quantity }];

      this.cartItems.next(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }

  updateCartItem(itemToUpdate: Item) {
    const currentCart = this.cartItems.value;
    const updatedCart = currentCart.map(item => {
      if (item.id === itemToUpdate.id) {
        return { ...item, quantity: itemToUpdate.quantity };
      } else {
        return item;
      }
    });

    this.cartItems.next(updatedCart);
    console.table(this.cartItems.value)
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  removeFromCart(item: Item) {
    const currentCart = this.cartItems.value;
    const updatedCart = currentCart.filter(cartItem => cartItem !== item);
    this.cartItems.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  increaseItem(itemToIncrease: Item) {
    const currentCart = this.cartItems.value;
    const existingItemIndex = currentCart.findIndex(item => item.id === itemToIncrease.id);

    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update the quantity
      const updatedCart = currentCart.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });

      this.cartItems.next(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }

  decreaseItem(itemToDecrease: Item) {
    const currentCart = this.cartItems.value;
    const existingItemIndex = currentCart.findIndex(item => item.id === itemToDecrease.id);
    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update the quantity
      const updatedCart = currentCart.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });

      this.cartItems.next(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }

  getCartItems(): any {
    return this.cartItems;
  }

  getNumberOfItems() {
    const currentCart = this.cartItems.value;
    return currentCart.length;
  }

  checkCouponCode() {

  }
}
