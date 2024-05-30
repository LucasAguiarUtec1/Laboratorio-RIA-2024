import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  isLoggedIn = false;
  role: string = '';

  constructor() { }

  setLoggedIn(value: boolean, role: string) {
    this.isLoggedIn = value;
    this.role = role;
  }

  setToken(token: string) {
    console.log('Token asignado:', token);
    this.tokenSubject.next(token);
  }

  getToken() {
    const token = this.tokenSubject.value;
    console.log('Token obtenido:', token); // Agrega esta línea
    return token;
  }
}