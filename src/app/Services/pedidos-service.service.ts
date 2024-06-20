import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosServiceService {
  private apiUrl = 'http://localhost:3000/pedidos';
  
  constructor(private http: HttpClient) { }

  agregarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/agregar-pedido`, pedido);
  }

  obtenerPedidos(email: string): Observable<Pedido[]> {
    const body = { email };
    return this.http.post<Pedido[]>(`${this.apiUrl}/obtener-pedidos`, body);
  }
}
