// src/app/tab9/tab9.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // 1. Importar Router
import { CategoryService } from '../services/category.service';

export interface Category {
  id_categoria: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-tab9',
  templateUrl: './tab9.page.html',
  styleUrls: ['./tab9.page.scss'],
  standalone: false // Este componente no es standalone, por lo que no se debe marcar como tal
})
export class Tab9Page implements OnInit {
  public categories: Category[] = [];
  public isLoading: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private router: Router // 2. Inyectar Router
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
        this.isLoading = false;
      }
    );
  }

  // 3. Crear el método para navegar
  viewCategoryProducts(categoryId: number) {
    // Navega a la nueva página, pasando el ID de la categoría en la URL
    this.router.navigate(['/product-list/category', categoryId]);
  }
}