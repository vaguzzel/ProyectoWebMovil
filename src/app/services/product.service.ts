import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

export interface Producto {
  id_producto: string;
  nombre: string;
  descripcion: string;
  marca_id: string;
  categoria_id?: string; 
  image_url?: string;
  marca_nombre?: string;
  categoria_nombre?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(
    private http: HttpClient,
    private authService: AuthService // 2. Inyectar AuthService en el constructor
  ) { }

  // Método para obtener las cabeceras con el token de autorización
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // --- MÉTODOS CRUD ---

  // Obtiene un producto por su ID, con sus ofertas (público)
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crea un nuevo producto junto con sus ofertas (protegido)
  createProductWithOffers(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData, { headers: this.getAuthHeaders() });
  }

  updateProductWithOffers(id: number, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productData, { headers: this.getAuthHeaders() });
  }

  // Elimina un producto (protegido)
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  

  buscarProductos(palabraClave: string): Observable<Producto[]> {
   const url = `${this.apiUrl}/buscar?q=${palabraClave}`;

    console.log('Solicitando URL al backend:', url);

    return this.http.get<Producto[]>(url);
  }
  
  getProductsByCategoryId(categoryId: number): Observable<any[]> {
  // Método para obtener productos por ID de categoría
    return this.http.get<any[]>(`http://localhost:5000/api/categories/${categoryId}/products`);
  }
}