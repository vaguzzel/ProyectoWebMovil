// src/app/components/header/header.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Ruta relativa corregida basada en tu estructura de carpetas
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false // Mantén esto en false
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string | null = null;
  isLoggedIn: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authSubscription.add(
      this.authService.isAuthenticated$.subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      })
    );

    // Suscribirse al nombre de usuario
    this.authSubscription.add(
      this.authService.userName$.subscribe(name => {
        this.userName = name;
      })
    );

    // Inicializar los valores al cargar el componente (útil para cuando se refresca la página)
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userName = this.authService.getUserName();
  }

  ngOnDestroy() {
    // Asegurarse de desuscribirse para evitar fugas de memoria
    this.authSubscription.unsubscribe();
  }

  goToTab2() {
    this.router.navigate(['/tabs/tab2']);
  }

  goToTab1() {
    this.router.navigate(['/tabs/tab1']);
  }

  goToTab5() { // Método para el botón de iniciar sesión
    this.router.navigate(['/tabs/tab5']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/tabs/tab5']); // Redirigir a la página de login
  }
}