import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../services/product';
import { Cart } from '../../services/cart';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { Alert } from '../../alert/alert/alert';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule, FormsModule, Alert],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: any[] = [];
  loading = true;
  message = '';
  type: 'success' | 'error' = 'success';

  constructor(
    private productService: Product,
    private cartService: Cart,
    private router: Router,
    private cd: ChangeDetectorRef,
    private Auth: Auth,
    private ngZone: NgZone,
  ) {}
  private timeoutId: any;

  ngOnInit() {
    console.log('INIT PRODUCTS');
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        console.log('DATA:', res); // Verificar la respuesta
        this.products = res;
        this.loading = false;
        this.cd.detectChanges(); // Forzar actualización de la vista
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.type = type;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => {
        this.message = '';
      });
    }, 3000);
  }

  addToCart(product: any) {
    const token = localStorage.getItem('token');

    if (!token) {
      //  guardar a dónde quería ir
      localStorage.setItem('returnUrl', '/products');

      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(product.id, 1).subscribe({
      next: () => {
        this.showMessage('Producto agregado', 'success');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.cartService.getCart().subscribe((res) => {
          const total = res.reduce((sum, item) => sum + item.quantity, 0);
          this.cartService.updateCartCount(total);
        });
      },
      error: (err) => {
        console.error(err);
        this.message = 'Error al agregar el producto al carrito';
        this.type = 'error';
        this.cd.detectChanges();
      },
    });
  }
  logout() {
    this.Auth.logout();
    this.router.navigate(['/login']);
  }
}
