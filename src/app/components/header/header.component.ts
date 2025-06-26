// src/app/components/header/header.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Ruta relativa corregida basada en tu estructura de carpetas
import { Subscription } from 'rxjs';
import { Category, CategoryService } from 'src/app/services/category.service';
import { PopoverController } from '@ionic/angular';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false // Mantén esto en false
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchQuery: string = ''; 
  userName: string | null = null;
  isLoggedIn: boolean = false;
  private authSubscription: Subscription = new Subscription();
  public categories: Category[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private categoryService: CategoryService, // Inyectar el servicio de categorías
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.loadCategories();
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

  // Método para cargar las categorías desde el servicio
  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error al cargar las categorías en el header:', error);
      }
    );
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

   goToContacto() { // Método para el botón de iniciar sesión
    this.router.navigate(['/tabs/contact-form']);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/tabs/tab5']); // Redirigir a la página de login
  }


  onSearchChange(event: any) {
    this.searchQuery = event.detail.value;
  }


  realizarBusqueda() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      // Si la búsqueda no está vacía, redirige a la Tab6Page con el parámetro de consulta
      this.router.navigate(['/tabs/tab6'], { queryParams: { q: this.searchQuery.trim() } });
    } else {
      // Si la búsqueda está vacía, redirige a la Tab6Page sin parámetros de consulta
      this.router.navigate(['/tabs/tab6']);
    }
  }

  async presentCategoryPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: CategoryMenuComponent, // El componente que mostraremos
      event: ev, // El evento de clic para que sepa dónde posicionarse
      translucent: true,
      componentProps: { // Le pasamos la lista de categorías al componente hijo
        categories: this.categories 
      }
    });
    return await popover.present();
  }
}