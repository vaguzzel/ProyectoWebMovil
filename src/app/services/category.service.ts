    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';


    export interface Category {
      id_categoria: number;
      nombre: string;
      descripcion: string;
    }

    @Injectable({
      providedIn: 'root'
    })
    export class CategoryService {
      private apiUrl = 'http://localhost:5000/api/categories';

      constructor(private http: HttpClient) { }

      getCategories(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
      }

      getById(id: number): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/${id}`);
      }

    }
    