import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { Cart } from '../../services/cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  cartCount$!: Observable<number>;
  email = '';

  constructor(
    public auth: Auth,
    private cartService: Cart,
  ) {
    this.cartCount$ = this.cartService.cartCount$;
    const token = this.auth.getToken();
    console.log('TOKEN:', token);

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('PAYLOAD:', payload);
    }
  }

  ngOnInit() {
    this.loadUser();
    if (this.auth.isLogged() && this.auth.isUser()) {
      this.cartService.getCart().subscribe((res) => {
        const total = res.reduce((sum, item) => sum + item.quantity, 0);
        this.cartService.updateCartCount(total);
      });
    }
  }
  loadUser() {
    this.email = this.auth.getUserEmail() || '';
  }

  logout() {
    this.auth.logout();
    window.location.href = '/login';
  }
}
