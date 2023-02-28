import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CartComponent } from './components/cart/cart.component';
import { FirstRegisterComponent } from './components/first-register/first-register.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductsComponent } from './components/products/products.component';
import { SecondRegisterComponent } from './components/second-register/second-register.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
    {
    path: '',
    redirectTo: "home",
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    outlet: 'leftBar'
  },
  {
    path: 'registerA',
    component: FirstRegisterComponent,
    outlet: 'leftBar'
  },
  {
    path: 'registerB',
    component: SecondRegisterComponent,
    outlet: 'leftBar'
  },
  {
    path: 'cart',
    component: CartComponent,
    outlet: 'leftBar'
  },
  {
    path: 'adminPanel',
    component: AdminPanelComponent,
    outlet: 'leftBar'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'orderDetails',
    component: OrderDetailsComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
