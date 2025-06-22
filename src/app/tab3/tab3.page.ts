// Ruta: src/app/tab3/tab3.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false // Lo dejamos como false como habías decidido
})
export class Tab3Page implements OnInit {

  // Propiedad para guardar los datos del producto que lleguen desde la API
  public producto: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    console.log('%cPASO 1: Página de detalles (tab3) cargada.', 'color: lime; font-weight: bold;');

    // 1. Obtenemos el ID de la URL (viene como string)
    const productIdString = this.route.snapshot.paramMap.get('id');

    console.log('%cPASO 2: El ID que llegó en la URL es:', 'color: lime; font-weight: bold;', productIdString);


    // 2. Nos aseguramos de que el ID no sea nulo
    if (productIdString) {
      // 3. Lo convertimos a número
      const productId = parseInt(productIdString, 10);
      console.log('%cPASO 3: Llamando al servicio con el ID numérico:', 'color: lime; font-weight: bold;', productId);


      // 4. Llamamos al método CORRECTO de tu servicio: getProductById
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          // 5. Si todo sale bien, guardamos los datos en nuestra propiedad 'producto'
          this.producto = data;
          console.log('%cPASO FINAL: ¡Éxito! Datos recibidos del backend:', 'color: lime; font-weight: bold;', this.producto);

        },
        error: (err) => {
          // 6. Si hay un error, lo mostramos en la consola
          console.error('Error al cargar los datos del producto:', err);
        }
      });
    } else {
      console.error('%cERROR CRÍTICO: No se encontró ningún ID en la URL. Revisa tu archivo tabs-routing.module.ts.', 'color: red; font-weight: bold;');
    }
  }
}