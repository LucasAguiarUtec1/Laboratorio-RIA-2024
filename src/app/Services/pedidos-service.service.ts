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

  obtenerTodosLosPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/obtener-todos-los-pedidos`);
  }

  tomarPedido(pedido: Pedido, nombre: string): Observable<Pedido> {
    const body = { pedido, nombre };
    console.log(body);
    return this.http.post<Pedido>(`${this.apiUrl}/tomar-pedido`, body);
  }

  cambiarEstadoPedido(pedido: Pedido, estado: string): Observable<Pedido> {
    const body = { pedido, estado };
    return this.http.post<Pedido>(`${this.apiUrl}/cambiar-estado-pedido`, body);
  }
}
