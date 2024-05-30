import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { Insumo } from '../models/insumo';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosServicesService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProductos(): Observable<Producto[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto[]>(this.apiUrl, { headers });
  }

  createProducto(producto: Producto): Observable<Producto> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }); 
    return this.http.post<Producto>(this.apiUrl, producto, { headers });
  }

  deleteProducto(id: number): Observable<Producto[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }); 
    return this.http.delete<Producto[]>(this.apiUrl + '/' + id, {headers});
  }

  editProducto(producto: Producto): Observable<Producto> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Producto>(this.apiUrl + '/' + producto.id, producto, {headers});
  }

  getInsumos(): Observable<Insumo[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Insumo[]>(this.apiUrl + 'insumos', {headers});
  }
}
