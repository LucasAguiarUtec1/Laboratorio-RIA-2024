import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LabBackendService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  // Obtener la lista de hospitales
  
  registerUser(email: string, password: string, role: string, telefono: string): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/register`; // Asume que la ruta de registro en tu servidor es '/register'
    const body = { email, password, role, telefono };
    return this.http.post<Usuario>(url, body);
  }

  loginUser(email: string, password: string): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/login`; // Asume que la ruta de registro en tu servidor es '/register'
    const body = { email, password };
    return this.http.post<Usuario>(url, body);
  }

  olvioContrasena(email: string): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/forgot-password`; // Asume que la ruta de registro en tu servidor es '/register'
    const body = { email };
    return this.http.post<Usuario>(url, body);
  }

  updateUser(email: string, newEmail: string, telefono: string): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/updateUser`; // Asume que la ruta de registro en tu servidor es '/register'
    const body = { email, newEmail, telefono };
    return this.http.put<Usuario>(url, body);
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}/usuarios/reset-password`;
    const body = { token, newPassword };
    return this.http.post<any>(url, body);
  }

  obtenerPanderos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios/obtener-panaderos`);
  }
}