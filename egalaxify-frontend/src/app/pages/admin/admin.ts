import { Component, OnInit } from '@angular/core';
import { Product } from '../../services/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Cart } from '../../services/cart';
import { Alert } from '../../alert/alert/alert';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, Alert],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  products: any[] = [];
  orders: any[] = [];
  message = '';
  type: 'success' | 'error' = 'success';

  editingProduct: any = null;

  newProduct = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: '',
  };

  constructor(
    private productService: Product,
    private cd: ChangeDetectorRef,
    private cartService: Cart,
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.cd.detectChanges();
    });
  }

  create() {
    if (!this.newProduct.name || this.newProduct.name.trim().length < 3) {
      this.message = 'El nombre debe tener al menos 3 caracteres';
      this.type = 'error';
      return;
    }

    if (!this.newProduct.description || this.newProduct.description.trim().length < 5) {
      this.message = 'La descripción es obligatoria';
      this.type = 'error';
      return;
    }

    if (this.newProduct.price <= 0) {
      this.message = 'El precio debe ser mayor a 0';
      this.type = 'error';
      return;
    }

    if (this.newProduct.stock < 0) {
      this.message = 'El stock no puede ser negativo';
      this.type = 'error';
      return;
    }
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.message = 'Producto creado';
      this.type = 'success';
      this.cd.detectChanges();
      this.loadProducts();
    });
  }

  delete(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.message = 'Producto eliminado';
      this.type = 'success';
      this.cd.detectChanges();
      this.loadProducts();
    });
  }
  edit(product: any) {
    this.editingProduct = { ...product }; // copia
  }
  loadOrders() {
    this.cartService.getAllOrders().subscribe((res) => {
      this.orders = res;
      this.cd.detectChanges();
    });
  }
  save() {
    if (!this.editingProduct.name || this.editingProduct.name.trim().length < 3) {
      this.message = 'Nombre inválido';
      this.type = 'error';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (this.editingProduct.price <= 0) {
      this.message = 'Precio inválido';
      this.type = 'error';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    this.productService.updateProduct(this.editingProduct).subscribe(() => {
      this.editingProduct = null;
      this.message = 'Producto actualizado';
      this.type = 'success';
      this.cd.detectChanges();
      this.loadProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  cancel() {
    this.editingProduct = null;
  }
}
