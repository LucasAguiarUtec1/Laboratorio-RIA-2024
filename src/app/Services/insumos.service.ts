import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import { Observable } from 'rxjs';
import { Insumo } from '../models/insumo';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  private apiUrl = 'http://localhost:3000/insumos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getInsumos(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(`${this.apiUrl}`);
  }

  createInsumo(insumo: Insumo): Observable<Insumo> {
    return this.http.post<Insumo>(`${this.apiUrl}`, insumo);
  }

  deleteInsumo(id: number): Observable<Insumo[]> {
    return this.http.delete<Insumo[]>(`${this.apiUrl}/${id}`);
  }

  editInsumo(insumo: Insumo): Observable<Insumo> {
    return this.http.put<Insumo>(`${this.apiUrl}/${insumo.id}`, insumo);
  }
}
