import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { Insumo } from '../models/insumo';
import { AuthService } from '../Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosServicesService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient, private authService: AuthService) { }
  // private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzE3MDkzNDI2LCJleHAiOjE3MTcwOTcwMjZ9.2ukGys1roNxh9Uyba22Ft32eRZHffoXD2DSZuQDEIOE';

  // getProductos(): Observable<Producto[]> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<Producto[]>(this.apiUrl, { headers });
  // }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  deleteProducto(id: number): Observable<Producto[]> {
    return this.http.delete<Producto[]>(`${this.apiUrl}/${id}`);
  }

  editProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${producto.id}`, producto);
  }


  getInsumos(): Observable<Insumo[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Insumo[]>(this.apiUrl + 'insumos', {headers});
  }
}
