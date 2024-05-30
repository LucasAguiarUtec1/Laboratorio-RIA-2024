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
}