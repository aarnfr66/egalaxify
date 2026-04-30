import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../services/cart';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(
    private cartService: Cart,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.cartService.getMyOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
}
