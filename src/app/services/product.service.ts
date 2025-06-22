import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id_producto: string;
  nombre: string;
  descripcion: number;
  marca_id: string;
  categoria_id?: string; 
  image_url?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarProductos(palabraClave: string): Observable<Producto[]> {
    // Asumiendo que tu backend tiene un endpoint como /api/productos/buscar?q=palabraClave
    return this.http.get<Producto[]>(`<span class="math-inline">\{this\.apiUrl\}/buscar?q\=</span>{palabraClave}`);
  }
}