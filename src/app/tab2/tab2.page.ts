// src/app/tab2/tab2.page.ts
import { Component, OnInit } from '@angular/core'; // Asegurarse de importar OnInit
import { HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importa el AuthService

interface WishlistItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  imageUrl: string;
  isLiked: boolean;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit { // Asegúrate de que implementa OnInit
  public currentView: string = 'perfil';
  public wishlistItems: WishlistItem[] = [
    {
      id: 1,
      brand: 'TOCOBO',
      name: 'Cica Protector Solar En Barra Cotton Soft Sun Stick SPF50',
      price: '$24.990',
      imageUrl: 'assets/images/tocobo_protector.webp',
      isLiked: true
    },
    {
      id: 2,
      brand: 'RARE BEAUTY',
      name: 'Bronceador en Barra Warm Wishes Effortless Bronzer Stick - Power Boost',
      price: '$35.000',
      imageUrl: 'assets/images/rare_beauty.webp',
      isLiked: true
    },
  ];

  // **Variables para los datos del usuario agregadas**
  userName: string | null = null;
  userEmail: string | null = null;
  userRole: string | null = null;

  constructor(private authService: AuthService) { }

  // **ngOnInit implementado**
  ngOnInit() {
    // Obtener los datos del usuario del AuthService al iniciar el componente
    this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getUserEmail();
    this.userRole = this.authService.getUserRole();

    // Suscribirse a los cambios si la página de perfil puede actualizarse sin recargar
    this.authService.userName$.subscribe(name => this.userName = name);
    this.authService.userEmail$.subscribe(email => this.userEmail = email);
    this.authService.userRole$.subscribe(role => this.userRole = role);
  }

  changeView(viewName: string) {
    this.currentView = viewName;
    console.log('Vista cambiada a:', this.currentView);
  }

  toggleLike(item: WishlistItem) {
    item.isLiked = !item.isLiked;
    console.log('Estado actualizado para', item.name, ':', item.isLiked);
  }
}