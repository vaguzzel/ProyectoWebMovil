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
  @Input() productId: string = '';
  @Output() wishlistToggle = new EventEmitter<void>();


  public get fullImageUrl(): string {
    // Si la imagen es una URL completa, la devolvemos tal cual.
    if (this.image && !this.image.startsWith('http')) {
      return `http://localhost:5000/${this.image}`;
    }
    // Si la imagen no está definida, devolvemos una imagen por defecto.
    return this.image || 'assets/images/placeholder-product.jpg';
  }

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
