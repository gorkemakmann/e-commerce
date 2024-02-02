import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "./features/shopping-cart/shopping-cart.service";
import {AuthService} from "./features/auth/services/auth.service";
import {StorageService} from "./features/storage/services/storage.service";
import {User} from "./features/user/models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Arcade';
  user?: User | null;
  constructor(private cartService: ShoppingCartService,private authService: AuthService, private storageService: StorageService) {

  }
  ngOnInit(): void {
    this.authService.user.subscribe(x => this.user = x);
  }
}
