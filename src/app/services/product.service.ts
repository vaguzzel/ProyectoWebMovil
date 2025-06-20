import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // 1. Importar AuthService

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

  // --- NUEVOS MÉTODOS CRUD ---

  /**
   * Crea un nuevo producto.
   * @param productData Los datos del producto a crear.
   */
  createProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData, { headers: this.getAuthHeaders() });
  }

  /**
   * Actualiza un producto existente por su ID.
   * @param productId El ID del producto a actualizar.
   * @param productData Los nuevos datos del producto.
   */
  updateProduct(productId: number, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, productData, { headers: this.getAuthHeaders() });
  }

  /**
   * Elimina un producto por su ID.
   * @param productId El ID del producto a eliminar.
   */
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`, { headers: this.getAuthHeaders() });
  }
  
}