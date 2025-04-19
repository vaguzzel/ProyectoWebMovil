import { Component } from '@angular/core';

interface WishlistItem {
  id: number; // O string, un identificador único
  brand: string;
  name: string;
  price: string;
  imageUrl: string;
  isLiked: boolean; // <-- La "bandera" para saber si está likeado
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  // 1. Variable para guardar el estado actual (nuestra "pizarra")
  //    Inicialmente mostramos 'perfil'
  public currentView: string = 'perfil';

  public wishlistItems: WishlistItem[] = [
    {
      id: 1,
      brand: 'TOCOBO',
      name: 'Cica Protector Solar En Barra Cotton Soft Sun Stick SPF50',
      price: '$24.990',
      imageUrl: 'assets/images/tocobo_protector.webp', // Asegúrate que la ruta es correcta
      isLiked: true // Estado inicial: likeado (corazón rojo)
    },
    {
      id: 2,
      brand: 'RARE BEAUTY',
      name: 'Bronceador en Barra Warm Wishes Effortless Bronzer Stick - Power Boost',
      price: '$35.000',
      imageUrl: 'assets/images/rare_beauty.webp', // Asegúrate que la ruta es correcta
      isLiked: true // Estado inicial: likeado (corazón rojo)
    },
  ];


  constructor() {}

  // 2. Método para cambiar el estado actual
  changeView(viewName: string) {
    this.currentView = viewName;
    console.log('Vista cambiada a:', this.currentView); // Para depuración
  }

  // 3. Método para cambiar el estado de un elemento en la wishlist
  toggleLike(item: WishlistItem) {
    item.isLiked = !item.isLiked; // Cambia el estado de likeado a no likeado y viceversa
    console.log('Estado actualizado para', item.name, ':', item.isLiked); // Para depuración
  }
}
