import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Cart } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../../alert/alert/alert';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, Alert],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  loading = true;
  total = 0;
  errorMessage = '';
  message = '';
  type: 'success' | 'error' = 'success';

  constructor(
    private cartService: Cart,
    private cd: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartItems = res;

        const total = res.reduce((sum, item) => sum + item.quantity, 0);
        this.cartService.updateCartCount(total);

        this.calculateTotal();
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => {
      return sum + (item.quantity * item.product?.price || 0);
    }, 0);
  }
  checkout() {
    const token = localStorage.getItem('token');

    if (!token) {
      localStorage.setItem('returnUrl', '/cart');
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartItems.length === 0) {
      this.message = 'No hay productos en el carrito';
      this.type = 'error';
      return;
    }

    this.cartService.checkout('Mi dirección').subscribe({
      next: () => {
        this.message = 'Compra realizada';
        this.type = 'success';
        //alert('Compra realizada');
        setTimeout(() => {
          this.loadCart();
          this.cartService.updateCartCount(0);
        }, 1000);
      },
      error: (err) => {
        this.message =
          err.error?.message || 'Error en la compra, posiblemente sin stock suficiente';
        this.type = 'error';
        this.cd.detectChanges();
      },
    });
  }
  remove(productId: number) {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.message = 'Producto eliminado';
        this.type = 'success';
        this.loadCart();
      },
      error: (err) => console.error(err),
    });
  }
}
