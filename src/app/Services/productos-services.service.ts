import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { Insumo } from '../models/insumo';

@Injectable({
  providedIn: 'root'
})
export class ProductosServicesService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/productos';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzE2OTIzNzc4LCJleHAiOjE3MTY5MjczNzh9.JWibEkaNpAi7nyzlvv2nL8CHj3l3Qc7IKZC84ytYYN8';

  getProductos(): Observable<Producto[]> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    }); 
    return this.http.get<Producto[]>(this.apiUrl, {headers});
  }

  createProducto(producto: Producto): Observable<Producto> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    }); 
    return this.http.post<Producto>(this.apiUrl, producto,{headers});
  }

  deleteProducto(id: number): Observable<Producto[]> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });
    return this.http.delete<Producto[]>(this.apiUrl + '/' + id, {headers});
  }

  getInsumos(): Observable<Insumo[]> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });

    return this.http.get<Insumo[]>(this.apiUrl + 'insumos', {headers});
  }
}
