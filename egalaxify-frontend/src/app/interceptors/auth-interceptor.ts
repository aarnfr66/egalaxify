import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    tap({
      error: (err) => {
        if (err.status === 401) {
          localStorage.removeItem('token');

          if (router.url !== '/login') {
            router.navigate(['/login']);
          }
        }
      },
    }),
  );
};
