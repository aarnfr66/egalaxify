import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private apiUrl = 'https://localhost:7207/api/cart';
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private http: HttpClient) {}

  addToCart(productId: number, quantity: number) {
    return this.http.post(this.apiUrl, {
      productId,
      quantity,
    });
  }

  getCart() {
    return this.http.get<any[]>(this.apiUrl);
  }
  checkout(address: string) {
    return this.http.post('https://localhost:7207/api/orders/checkout', {
      address,
    });
  }
  getMyOrders() {
    return this.http.get<any[]>('https://localhost:7207/api/orders/my-orders');
  }
  removeFromCart(productId: number) {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }
  updateCartCount(count: number) {
    this.cartCount.next(count);
  }
  addToCartCount(amount: number) {
    const current = this.cartCount.value;
    this.cartCount.next(current + amount);
  }
  getAllOrders() {
    return this.http.get<any[]>('https://localhost:7207/api/orders');
  }
}
