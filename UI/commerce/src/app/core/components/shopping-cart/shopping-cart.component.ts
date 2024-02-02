import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShoppingCartService} from "../../../features/shopping-cart/shopping-cart.service";
import {Item} from "../../../features/item/models/item.model";
import {CategoryService} from "../../../features/category/services/category.service";
import {ItemService} from "../../../features/item/services/item.service";
import {OrderService} from "../../../features/order/services/order.service";
import {Coupon} from "../../../features/order/models/coupon.model";
import {CreateOrder} from "../../../features/order/models/createOrder.model";
import {AuthService} from "../../../features/auth/services/auth.service";
import {OrderLine} from "../../../features/order/models/orderLine.model";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Item[] = [];
  selectedItem: Item = {} as Item;
  couponCode: string = "";
  coupon: Coupon = {} as Coupon
  totalPrice: number = 0;
  oldTotalPrice: number = 0;
  couponApplied: boolean = false;
  couponAppliedText: string = '';

  order: CreateOrder = {} as CreateOrder;
  orderSuccessMessage = "";
  orderErrorMessage = "";

  constructor(private cartService: ShoppingCartService,
              private categoryService: CategoryService,
              private itemService: ItemService,
              private orderService: OrderService,
              private authService: AuthService) {


  }


  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartItems.forEach(item => {
        this.totalPrice += item.price * item.quantity;
        this.oldTotalPrice += item.price * item.quantity;
      });
    });
  }

  removeFromCart(item: Item) {
    this.totalPrice = 0;
    this.oldTotalPrice = 0;
    if(this.couponApplied) {
      this.cartService.removeFromCart(item);
      this.totalPrice  = this.totalPrice - (this.totalPrice * (this.coupon.discountPercentage / 100));
    } else {
      this.cartService.removeFromCart(item);
    }
  }

  increaseItem(item: Item) {
    this.totalPrice = 0;
    this.oldTotalPrice = 0;
    if(this.couponApplied) {
      this.cartService.increaseItem(item);
      this.totalPrice  = this.totalPrice - (this.totalPrice * (this.coupon.discountPercentage / 100));
    } else {
      this.cartService.increaseItem(item);
    }

  }

  decreaseItem(item: Item) {
    this.totalPrice = 0;
    this.oldTotalPrice = 0;
    if(item.quantity <= 0) {
      item.quantity = 0;
    } else {
      if(this.couponApplied) {
        this.cartService.decreaseItem(item);
        this.totalPrice  = this.totalPrice - (this.totalPrice * (this.coupon.discountPercentage / 100));
      } else {
        this.cartService.decreaseItem(item);
      }

    }
  }

  getCurrentItem(item: Item) {
    this.selectedItem = item;
    //console.log(this.selectedItem);
  }

  getCoupon() {
    this.coupon = {} as Coupon;
    //this.couponApplied = false;
    this.orderService.getCoupon(this.couponCode).subscribe(coupon => {
      if(coupon) {
        this.coupon = coupon;
        if(this.coupon.discountPercentage > 0 && !this.couponApplied) {
          this.couponApplied = true;
          this.oldTotalPrice = this.totalPrice;
          //console.log(this.coupon);
          this.totalPrice  = this.totalPrice - (this.totalPrice * (this.coupon.discountPercentage / 100));
          this.couponAppliedText = 'Coupon applied. ' + this.coupon.discountPercentage + '%';
        }
      }
      else {
        this.couponApplied = false;
        this.couponAppliedText = 'Coupon is wrong.'
      }
    });
  }

  createOrder() {

    this.order.totalPrice = this.totalPrice + 5;
    this.order.isDiscountApplied = this.couponApplied;
    this.order.totalItems = this.cartItems.length;
    // @ts-ignore
    this.order.userId = this.authService.getUserInfo()?.id;
    this.order.orderLines = this.cartItems.map((item: Item) => {
      const orderLine: OrderLine = {
        id: "123",
        itemName: item.name,
        itemId: item.id,
        price: item.price,
        quantity: item.quantity,
      };
      return orderLine;
    });
    console.table(this.order);
    this.orderService.createOrder(this.order).subscribe(
      (res: any) => {
        // Handle successful response
        this.orderSuccessMessage = "Order sent successfully";
        this.cartItems = [];
        localStorage.removeItem('cart');

        console.log('Success:', res);
        // You can perform additional actions with the response here
      },
      (error: any) => {
        // Handle error
        this.orderErrorMessage = "Order could not be sent";
        console.error('Error:', error.error);
        // You can perform additional actions for error handling here
      }
    );

  }

  validateInput(item: Item) {
    if (item.quantity < 0) {
      // If the entered value is below zero, reset it to the minimum value (zero in this case)
      item.quantity = 0;
    }
  }

  updateCartItem(item: Item) {
    // Ensure the quantity is not negative
    if (item.quantity < 0) {
      item.quantity = 0;
    }

    this.totalPrice = 0;
    this.oldTotalPrice = 0;

    if (this.couponApplied) {
      this.cartService.updateCartItem(item);
      this.totalPrice = this.calculateDiscountedTotalPrice();
    } else {
      this.cartService.updateCartItem(item);
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = 0; // Reset total price before recalculating
    this.oldTotalPrice = 0;

    this.cartItems.forEach(item => {
      this.totalPrice += item.price * item.quantity;
      this.oldTotalPrice += item.price * item.quantity;
    });
  }

  calculateDiscountedTotalPrice() {
    const totalPriceBeforeDiscount = this.totalPrice;
    this.totalPrice = totalPriceBeforeDiscount - (totalPriceBeforeDiscount * (this.coupon.discountPercentage / 100));
    return this.totalPrice;
  }

  onQuantityInput(event: Event, item: Item) {
    // Get the input value and convert it to a number
    const inputValue = (event.target as HTMLInputElement).value;
    const quantity = parseInt(inputValue, 10);

    // Ensure the quantity is not negative
    if (quantity < 0 || isNaN(quantity)) {
      item.quantity = 0;
    } else {
      item.quantity = quantity;
    }

    this.updateCartItem(item);
  }


}


