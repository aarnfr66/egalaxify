import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/login'; // 👈 importante
    return false;
  }

  return true;
};
