import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { CartComponent } from './pages/cart/cart';
import { authGuard } from './guards/auth-guard';
import { MyOrders } from './pages/my-orders/my-orders';
import { Admin } from './pages/admin/admin';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'products', component: Products },
  { path: 'cart', component: CartComponent },
  { path: 'my-orders', component: MyOrders },
  { path: 'admin', component: Admin },
  { path: 'register', component: Register },
  { path: '**', redirectTo: 'products' },
];
