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
import { AuthInterceptor } from './methods/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FirstRegisterComponent } from './components/first-register/first-register.component';
import { SecondRegisterComponent } from './components/second-register/second-register.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { MainComponent } from './components/main/main.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { PopMessageComponent } from './components/pop-message/pop-message.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FixPricePipe } from './methods/fix-price.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
    InfoComponent,
    HomeComponent,
    FirstRegisterComponent,
    SecondRegisterComponent,
    OrderDetailsComponent,
    MainComponent,
    CartComponent,
    ProductsComponent,
    NotFoundComponent,
    PopUpProductComponent,
    HighlighterPipe,
    SuccessOrderComponent,
    AdminPanelComponent,
    PopMessageComponent,
    FixPricePipe  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ButtonsModule,
    DialogsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    NgxMatFileInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [
    OrdersService,
    ProductsService,
    UsersService,
    CartsService,
    CategoriesService,
    itemsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MatDialog,
    Location,
    DatePipe,
    NgxMatFileInputModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
