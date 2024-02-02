import {Component, DoCheck, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../features/auth/services/auth.service";
import {ShoppingCartService} from "../../../features/shopping-cart/shopping-cart.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']})
export class NavbarComponent implements OnInit, DoCheck{
  numberOfCartItems: number = 0;
  constructor(public authService: AuthService, private cartService: ShoppingCartService) {
  }
  ngOnInit() {
    this.numberOfCartItems = this.cartService.getNumberOfItems();
  }

  ngDoCheck() {
    this.numberOfCartItems = this.cartService.getNumberOfItems();
  }

  logout() {
    this.authService.logout();
  }



}
