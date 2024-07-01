import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getTokenFromStorage());
  isLoggedIn = false;
  role: string | null = null;
  nombre: string | null = null;

  constructor() {
    const token = this.getToken();
    if (token) {
      this.isLoggedIn = true;
      this.role = this.getRoleFromStorage();
      this.nombre = this.getNombreFromStorage();
    }
  }

  setLoggedIn(value: boolean, role: string | null, nombre: string | null) {
    this.isLoggedIn = value;
    this.role = role;
    this.nombre = nombre;
    this.setRoleInStorage(role);
    this.setNombreInStorage(nombre);
  }

  setToken(token: string | null) {
    if (token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
      }
    } else {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
    }
    this.tokenSubject.next(token);
  }

  getToken() {
    return this.tokenSubject.value;
  }

  private getTokenFromStorage(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private setRoleInStorage(role: string | null) {
    if (typeof window !== 'undefined') {
      if (role) {
        localStorage.setItem('userRole', role);
      } else {
        localStorage.removeItem('userRole');
      }
    }
  }

  public getRoleFromStorage(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userRole');
    }
    return null;
  }

  private setNombreInStorage(nombre: string | null) {
    if (typeof window !== 'undefined') {
      if (nombre) {
        localStorage.setItem('userNombre', nombre);
      } else {
        localStorage.removeItem('userNombre');
      }
    }
  }

  private getNombreFromStorage(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userNombre');
    }
    return null;
  }

  logout() {
    this.setToken(null);
    this.setLoggedIn(false, null, null);
    this.setRoleInStorage(null);
    this.setNombreInStorage(null);
  }
}
