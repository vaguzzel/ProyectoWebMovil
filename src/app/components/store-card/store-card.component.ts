import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
  standalone: false,
  
})
export class StoreCardComponent  implements OnInit {

   // Propiedades que el componente recibirá desde fuera
   @Input() storeName: string = 'Nombre Tienda'; // Nombre de la tienda
   @Input() price: number = 0; // Precio del producto en esa tienda
   @Input() availability: string = 'Info disponibilidad'; // Texto de disponibilidad/envío
   @Input() rating: number = 0; // Calificación (ej: 3.5, 4, etc. sobre 5)
   @Input() productUrl: string = '';
  constructor() { }

  ngOnInit() {}
  //es una funcion que retorna un arreglo con los nombres de iconos para colocarlos en el 
  get stars(): string[] {
    const fullStars = Math.floor(this.rating);
    const halfStar = (this.rating % 1) >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill('star'),
      ...Array(halfStar).fill('star-half-sharp'), // O 'star-half' si prefieres outline
      ...Array(emptyStars).fill('star-outline')
    ];
  }

}
