import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Alert } from '../../alert/alert/alert';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, Alert],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  fullName = '';
  email = '';
  password = '';

  message = '';
  type: 'success' | 'error' = 'success';

  constructor(
    private authService: Auth,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  register() {
    if (!this.fullName || !this.email || !this.password) {
      this.message = 'Completa todos los campos';
      this.type = 'error';
      return;
    }

    if (!this.email.includes('@')) {
      this.message = 'Email inválido';
      this.type = 'error';
      return;
    }

    if (this.password.length < 6) {
      this.message = 'La contraseña debe tener al menos 6 caracteres';
      this.type = 'error';
      return;
    }

    const data = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.message = 'Usuario creado correctamente';
        this.type = 'success';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.message = err.error || 'Error al registrar';
        this.type = 'error';
        this.cd.detectChanges();
      },
    });
  }
}
