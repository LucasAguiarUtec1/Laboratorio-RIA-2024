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

  constructor() { }

  setLoggedIn(value: boolean, role: string | null, email: string | null) {
    this.isLoggedIn = value;
    this.role = role;
    this.nombre = email;
  }

  setToken(token: string | null) {
    console.log('Token asignado:', token);
    this.tokenSubject.next(token);
  }

  getToken() {
    const token = this.tokenSubject.value;
    console.log('Token obtenido:', token); // Agrega esta línea
    return token;
  }

  logout() {
    this.setToken(null);
    this.setLoggedIn(false, null, null);
  }
}