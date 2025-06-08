import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:5000/api/wishlist';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getWishlist(): Observable<any[]> {
    const userId = this.authService.getUserId();
    // La ruta del backend usa el ID del usuario en la URL
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  addToWishlist(productId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, { id_producto: productId }, { headers: this.getAuthHeaders() });
  }

  removeFromWishlist(productId: number): Observable<any> {
    const userId = this.authService.getUserId();
    return this.http.delete<any>(`${this.apiUrl}/user/${userId}/product/${productId}`, { headers: this.getAuthHeaders() });
  }
}