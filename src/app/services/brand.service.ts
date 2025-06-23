import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  // Esta URL debe coincidir con la ruta que definiste en backend/server.js
  private apiUrl = 'http://localhost:5000/api/brands'; 

  constructor(private http: HttpClient) { }

  // Método para obtener todas las marcas desde el backend
  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
