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
  @Input() productId: number | string = '';
  @Input() isNavigable: boolean = false;

  @Output() wishlistToggle = new EventEmitter<void>();

  // 2. INYECTAMOS ROUTER EN EL CONSTRUCTOR
  constructor(private router: Router) { }

  // 3. NUEVO MÉTODO PARA EL CLIC EN LA TARJETA
  onCardClick() {
    // Solo navega si la tarjeta está configurada como navegable y tiene un ID
    if (this.isNavigable && this.productId) {
      this.router.navigate(['/tabs/tab3', this.productId]);
    }
  }

  // Este método se mantiene igual, deteniendo la propagación del clic
  onWishlistClick(event: Event) {
    event.stopPropagation(); // Previene que se active onCardClick()
    this.wishlistToggle.emit();
  }
}