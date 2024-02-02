import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from "./core/components/navbar/navbar.component";
import {CategoryListComponent} from "./features/category/category-list/category-list.component";
import {AddCategoryComponent} from "./features/category/add-category/add-category.component";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {OverlayComponent} from "./core/components/overlay/overlay.component";
import {HomeComponent} from "./core/components/home/home.component";
import { ProductCellComponent } from './core/components/product-cell/product-cell.component';
import { CustomerReviewComponent } from './core/components/customer-review/customer-review.component';
import { CallToActionComponent } from './core/components/call-to-action/call-to-action.component';
import { FooterFeaturesComponent } from './core/components/footer-features/footer-features.component';
import {AboutComponent} from "./core/components/about/about.component";
import { ProductComponent } from './core/components/product/product.component';
import { ShoppingCartComponent } from './core/components/shopping-cart/shopping-cart.component';
import {ShoppingCartService} from "./features/shopping-cart/shopping-cart.service";
import { LoginComponent } from './core/components/login/login.component';
import {ErrorInterceptor} from "./features/auth/JWTInterceptor/error.interceptor";
import {JwtInterceptor} from "./features/auth/JWTInterceptor/jwt.interceptor";
import { RegisterComponent } from './core/components/register/register.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { ShopComponent } from './core/components/shop/shop.component';
import { NgxSpinnerModule } from "ngx-spinner";
interface NgxSpinnerConfig {
  type?: string;
}
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        CategoryListComponent,
        AddCategoryComponent,
        OverlayComponent,
        HomeComponent,
        ProductCellComponent,
        CustomerReviewComponent,
        CallToActionComponent,
        FooterFeaturesComponent,
        AboutComponent,
        ProductComponent,
        ShoppingCartComponent,
        LoginComponent,
        RegisterComponent,
        FooterComponent,
        ShopComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [ShoppingCartService,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
