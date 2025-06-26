// src/app/tab1/tab1.page.ts (VERSIÓN COMPLETA Y DEFINITIVA)

import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { WishlistService } from '../services/wishlist.service';
import { AuthService } from '../services/auth.service';

// Interfaz para el contenedor Swiper
interface SwiperContainer extends HTMLElement {
  swiper?: any;
}

register();

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false, // Lo dejamos como false como habías decidido
})
export class Tab1Page implements OnInit, AfterViewInit {
  
  // ===============================================
  // LÓGICA PARA MANEJAR LOS CARRUSELES (SLIDERS)
  // ===============================================
  @ViewChild('ofertasSwiper') ofertasSwiper: ElementRef | undefined;
  @ViewChild('masVendidosSwiper') masVendidosSwiper: ElementRef | undefined;

  // ====================================================
  // LÓGICA PARA MANEJAR DATOS Y LA LISTA DE DESEOS
  // ====================================================
  products: any[] = [];
  wishlistProductIds = new Set<number>();

  constructor(
    private router: Router,
    private productService: ProductService,
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {}
  
  // ngOnInit se usa para la lógica de inicialización, como cargar datos.
  ngOnInit() {
    this.loadProducts();
  }

  // ngAfterViewInit se usa para la lógica que depende de que el HTML ya esté en pantalla.
  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeSwiperNavigation();
    }, 500);
  }

  ionViewWillEnter() {
    if (this.authService.isLoggedIn()) {
      this.loadWishlist();
    } else {
      this.wishlistProductIds.clear();
      this.updateLikedStatus();
    }
  }

  // --- Función para inicializar las flechas de los sliders ---
  initializeSwiperNavigation() {
    const ofertasPrev = document.querySelector('.ofertas-prev');
    const ofertasNext = document.querySelector('.ofertas-next');
    if (ofertasPrev) {
      ofertasPrev.addEventListener('click', () => {
        const swiperEl = document.querySelector('.ofertas-swiper') as SwiperContainer;
        if (swiperEl && swiperEl.swiper) swiperEl.swiper.slidePrev();
      });
    }
    if (ofertasNext) {
      ofertasNext.addEventListener('click', () => {
        const swiperEl = document.querySelector('.ofertas-swiper') as SwiperContainer;
        if (swiperEl && swiperEl.swiper) swiperEl.swiper.slideNext();
      });
    }
    
  }

  // --- Funciones para cargar datos y manejar la lista de deseos ---
  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      if (this.authService.isLoggedIn()) {
        this.loadWishlist();
      }
    });
  }

  loadWishlist() {
    this.wishlistService.getWishlist().subscribe(wishlistItems => {
      const ids = wishlistItems.map(item => item.id_producto);
      this.wishlistProductIds = new Set(ids);
      this.updateLikedStatus();
    });
  }

  updateLikedStatus() {
    this.products.forEach(p => {
      p.isLiked = this.wishlistProductIds.has(p.id_producto);
    });
  }

  
  toggleWishlist(product: any) {
    console.log('PASO 2: La página principal RECIBIÓ el clic para:', product.nombre); // <-- AÑADE ESTA LÍNEA
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/tabs/tab5']); // Redirige a la página de login
      return;
    }

    const productId = product.id_producto;
    
    // Hacemos el cambio visual inmediatamente para una mejor experiencia de usuario
    product.isLiked = !product.isLiked;

    if (product.isLiked) {
      // Si ahora está likeado, lo añadimos a la BD
      this.wishlistService.addToWishlist(productId).subscribe({
        next: () => this.wishlistProductIds.add(productId),
        error: () => {
          product.isLiked = false; // Si hay un error, revertimos el cambio visual
          console.error('Error al añadir a la lista de deseos');
        }
      });
    } else {
      // Si le quitamos el like, lo eliminamos de la BD
      this.wishlistService.removeFromWishlist(productId).subscribe({
        next: () => this.wishlistProductIds.delete(productId),
        error: () => {
          product.isLiked = true; // Si hay un error, revertimos el cambio visual
          console.error('Error al quitar de la lista de deseos');
        }
      });
    }
  }

  goToTab2() {
    this.router.navigate(['/tabs/tab2']);
  }
}