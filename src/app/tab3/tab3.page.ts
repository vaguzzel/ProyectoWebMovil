// src/app/tab3/tab3.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Producto } from '../services/product.service'; // Asegúrate que la interfaz Producto esté exportada del servicio

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false 
})
export class Tab3Page implements OnInit {

  // Propiedad para almacenar el producto que vamos a mostrar
  producto: any; // Puedes usar tu interfaz 'Producto' si la tienes bien definida con las ofertas
  cargando: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute, // Para leer los parámetros de la URL
    private productService: ProductService // Para obtener los datos del producto
  ) { }

  ngOnInit() {
    this.cargarProducto();
  }

  cargarProducto() {
    // 1. Obtener el ID de la URL
    const idParam = this.route.snapshot.paramMap.get('id');
    
    // Es buena práctica asegurarse de que el id no es nulo y es un número
    if (!idParam) {
      this.error = 'No se encontró un ID de producto.';
      this.cargando = false;
      return;
    }

    const productoId = +idParam; // El '+' convierte el string a número

    // 2. Llamar al servicio para obtener los datos del producto
    this.productService.getProductById(productoId).subscribe({
      next: (data) => {
        // 3. Guardar los datos en nuestra propiedad
        this.producto = data;
        this.cargando = false;
        console.log('Producto cargado:', this.producto);
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.error = 'No se pudo cargar la información del producto.';
        this.cargando = false;
      }
    });
  }
}