import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

// Definir la interfaz para el contenedor Swiper
interface SwiperContainer extends HTMLElement {
  swiper?: any;
}

// Registrar elementos de Swiper para Angular
register();

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements AfterViewInit {
  
  @ViewChild('ofertasSwiper') ofertasSwiper: ElementRef | undefined;
  @ViewChild('masVendidosSwiper') masVendidosSwiper: ElementRef | undefined;
  
  constructor() {}
  
  ngAfterViewInit() {
    // Inicializar la navegación cuando la vista se haya cargado completamente
    setTimeout(() => {
      this.initializeSwiperNavigation();
    }, 500);
  }
  
  initializeSwiperNavigation() {
    // Botones de navegación para Ofertas slider
    const ofertasPrev = document.querySelector('.ofertas-prev');
    const ofertasNext = document.querySelector('.ofertas-next');
    
    if (ofertasPrev) {
      ofertasPrev.addEventListener('click', () => {
        const swiperEl = document.querySelector('.ofertas-swiper') as SwiperContainer;
        if (swiperEl && swiperEl.swiper) {
          swiperEl.swiper.slidePrev();
        }
      });
    }
    
    if (ofertasNext) {
      ofertasNext.addEventListener('click', () => {
        const swiperEl = document.querySelector('.ofertas-swiper') as SwiperContainer;
        if (swiperEl && swiperEl.swiper) {
          swiperEl.swiper.slideNext();
        }
      });
    }
    
    // Botones de navegación para Más Vendidos slider
    const mvPrev = document.querySelector('.mv-prev');
    const mvNext = document.querySelector('.mv-next');
    
    if (mvPrev) {
      mvPrev.addEventListener('click', () => {
        const swiperEl = document.querySelector('.mas-vendidos-swiper') as SwiperContainer;
        if (swiperEl && swiperEl.swiper) {
          swiperEl.swiper.slidePrev();
        }
      });
    }
    
    if (mvNext) {
      mvNext.addEventListener('click', () => {
        const swiperEl = document.querySelector('.mas-vendidos-swiper') as SwiperContainer;
        if (swiperEl && swiperEl.swiper) {
          swiperEl.swiper.slideNext();
        }
      });
    }
  }
}