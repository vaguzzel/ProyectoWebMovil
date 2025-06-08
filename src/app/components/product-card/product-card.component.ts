import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false
})
export class ProductCardComponent {
  @Input() image: string = '';
  @Input() brand: string = '';
  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() previousPrice?: number;
  @Input() isLiked: boolean = false;

  @Output() wishlistToggle = new EventEmitter<void>();

  constructor() { }
  /*
  onWishlistClick(event: Event) {
    event.stopPropagation(); // Evita que otros eventos de clic se disparen
    this.wishlistToggle.emit();
  }*/

  onWishlistClick(event: Event) {
    console.log('PASO 1: ¡Clic detectado DENTRO de la tarjeta!'); // <-- AÑADE ESTA LÍNEA
    event.stopPropagation();
    this.wishlistToggle.emit();
  }
}
