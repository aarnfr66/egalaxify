import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Alert } from '../../alert/alert/alert';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, Alert, RouterModule],
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';
  message = '';
  type: 'success' | 'error' = 'success';

  constructor(
    private authService: Auth,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    if (this.authService.isLogged()) {
      this.router.navigate(['/products']);
    }
  }
  login() {
    if (!this.email || !this.password) {
      this.message = 'Completa los campos';
      this.type = 'error';
      return;
    }
    const data = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(data).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);

        const returnUrl = localStorage.getItem('returnUrl') || '/products';
        localStorage.removeItem('returnUrl');

        window.location.href = returnUrl;
      },
      error: () => {
        this.message = 'Credenciales incorrectas';
        this.type = 'error';
        this.cd.detectChanges();

        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
    });
  }
}
