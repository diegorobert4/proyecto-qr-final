import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('username') !== null;

    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirige a login si no está autenticado
      return false;
    }

    return true; // Permite el acceso a la ruta
  }
}
