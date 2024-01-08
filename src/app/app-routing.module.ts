import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';

import { authGuard } from './guard/auth.guard';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { AddressComponent } from './component/address/address.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { AdmincategoryComponent } from './component/admin/admincategory/admincategory.component';
import { UserComponent } from './component/admin/user/user.component';
import { AdminOrderComponent } from './component/adminorder/adminorder.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admincategory',
    component: AdmincategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'adminorder',
    component: AdminOrderComponent,
    canActivate: [authGuard],
  },
  { path: 'address', component: AddressComponent, canActivate: [authGuard] },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  { path: 'adminDashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
