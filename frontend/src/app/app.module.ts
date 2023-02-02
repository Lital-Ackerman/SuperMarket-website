import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import { InfoComponent } from './components/info/info.component';
import { OrdersService } from './services/orders.service';
import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';
import { ConvertDatePipe } from './convert-date.pipe';
import { AuthInterceptor } from './methods/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FirstRegisterComponent } from './components/first-register/first-register.component';
import { SecondRegisterComponent } from './components/second-register/second-register.component';
import { ShopComponent } from './components/shop/shop.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { MainComponent } from './components/main/main.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  } from '@angular/material';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PopUpProductComponent } from './components/pop-up-product/pop-up-product.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CartsService } from './services/carts.service';
import { CategoriesService } from './services/categories.service';
import { itemsService } from './services/items.service';
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { HighlighterPipe} from './methods/high-lighter.pipe';
import { SuccessOrderComponent } from './components/success-order/success-order.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserActionsComponent } from './components/user-actions/user-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
    InfoComponent,
    ConvertDatePipe,
    HomeComponent,
    FirstRegisterComponent,
    SecondRegisterComponent,
    ShopComponent,
    OrderDetailsComponent,
    MainComponent,
    CartComponent,
    ProductsComponent,
    NotFoundComponent,
    PopUpProductComponent,
    HighlighterPipe,
    SuccessOrderComponent,
    AdminPanelComponent,
    UserActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ButtonsModule,
    DialogsModule
  ],
  providers: [
    OrdersService,
    ProductsService,
    UsersService,
    CartsService,
    CategoriesService,
    itemsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MatDialog

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
