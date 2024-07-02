import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  isLoggedIn = false;
  role: string | null = null;
  nombre: string | null = null;
  telefono: string | null = null;

  constructor() { }

  setLoggedIn(value: boolean, role: string | null, email: string | null, telefono: string | null) {
    this.isLoggedIn = value;
    this.role = role;
    this.nombre = email;
    this.telefono = telefono;
  }
  
  setToken(token: string | null) {
    this.tokenSubject.next(token);
  }

  getToken() {
    const token = this.tokenSubject.value;
    return token;
  }

  logout() {
    this.setToken(null);
    this.setLoggedIn(false, null, null, null);
  }
}