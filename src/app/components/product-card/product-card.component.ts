// src/app/components/product-card/product-card.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; // 1. IMPORTAMOS ROUTER

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
  
  @Input() isNavigable: boolean = false;
  
  @Output() wishlistToggle = new EventEmitter<void>();

  constructor(private router: Router) { }

  public get fullImageUrl(): string {
    // Si la imagen es una URL completa, la devolvemos tal cual.
    if (this.image && !this.image.startsWith('http')) {
      return `http://localhost:5000/${this.image}`;
    }
    // Si la imagen no está definida, devolvemos una imagen por defecto.
    return this.image || 'assets/images/placeholder-product.jpg';
  }

  // AÑADE ESTA FUNCIÓN DE NAVEGACIÓN QUE FALTABA
  onCardClick() {
    // Solo navega si la tarjeta está marcada como navegable y tiene un ID
    if (this.isNavigable && this.productId) {
      this.router.navigate(['/tabs/tab3', this.productId]);
    }
  }


  onWishlistClick(event: Event) {
    event.stopPropagation(); // Previene que se active onCardClick()
    this.wishlistToggle.emit();
  }
}