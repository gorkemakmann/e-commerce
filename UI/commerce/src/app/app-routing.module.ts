import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/components/home/home.component";
import {CommonModule} from "@angular/common";
import {AboutComponent} from "./core/components/about/about.component";
import {ProductComponent} from "./core/components/product/product.component";
import {ShoppingCartComponent} from "./core/components/shopping-cart/shopping-cart.component";
import {LoginComponent} from "./core/components/login/login.component";
import {AuthGuard} from "./features/auth/_guards/auth/auth.guard";
import {RegisterComponent} from "./core/components/register/register.component";
import {ShopComponent} from "./core/components/shop/shop.component";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path:'product',
    component: ProductComponent
  },
  {
    path:'product/:id',
    component:ProductComponent
  },
  {
    path:'shopping-cart',
    component:ShoppingCartComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'shop',
    component: ShopComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule,CommonModule]
})
export class AppRoutingModule { }
