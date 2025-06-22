// src/app/tab6/tab6.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ProductService, Producto } from '../services/product.service';

@Component({
  selector: 'app-tab6', 
  templateUrl: './tab6.page.html', 
  styleUrls: ['./tab6.page.scss'], 
  standalone: false
})
export class Tab6Page implements OnInit { 
  palabraClave: string = '';
  productosEncontrados: Producto[] = [];
  cargando: boolean = false;
  error: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productosService: ProductService
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios en los query parameters de la URL
    this.activatedRoute.queryParams.subscribe(params => {
      this.palabraClave = params['q'] || ''; // Obtiene el valor del parámetro 'q'
      if (this.palabraClave) {
        this.buscarProductos(); // Si hay palabra clave, inicia la búsqueda
      } else {
        console.log('No se proporcionó palabra clave para la búsqueda.');
        this.productosEncontrados = []; // Limpia resultados si no hay búsqueda
      }
    });
  }

  buscarProductos() {
    this.cargando = true; // Activa el spinner de carga
    this.error = null; // Reinicia el mensaje de error
    this.productosEncontrados = []; // Limpia resultados de búsquedas anteriores

    this.productosService.buscarProductos(this.palabraClave).subscribe({
      next: (data) => {
        this.productosEncontrados = data;
        this.cargando = false; // Desactiva el spinner
        console.log('Productos encontrados:', this.productosEncontrados);
      },
      error: (err) => {
        console.error('Error al buscar productos:', err);
        this.error = 'No se pudieron cargar los productos. Por favor, inténtalo de nuevo más tarde.';
        this.cargando = false; // Desactiva el spinner
        this.productosEncontrados = []; // Vacía los resultados en caso de error
      }
    });
  }
}