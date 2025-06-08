// src/app/tab2/tab2.page.ts (VERSIÓN MODIFICADA Y DINÁMICA)

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { EditProfileModalComponent } from '../components/edit-profile-modal/edit-profile-modal.component';
import { ChangePasswordModalComponent } from '../components/change-password-modal/change-password-modal.component';
import { WishlistService } from '../services/wishlist.service'; // <-- 1. Importamos el servicio

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page implements OnInit {
  public currentView: string = 'perfil';
  
  // 2. Inicializamos la lista de deseos como un arreglo vacío
  public wishlistItems: any[] = [];

  userName: string | null = null;
  userEmail: string | null = null;
  userRole: string | null = null;

  // 3. Inyectamos el WishlistService en el constructor
  constructor(
    private authService: AuthService,
    private wishlistService: WishlistService,
    private modalController: ModalController 
  ) {}

  ngOnInit() {
    this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getUserEmail();
    this.userRole = this.authService.getUserRole();
  }

  // Nueva función para cargar o refrescar los datos del perfil
  loadProfileData() {
    this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getUserEmail();
    this.userRole = this.authService.getUserRole();
  }

  
  
  // Usamos ionViewWillEnter para que la lista se actualice cada vez que entramos a la pestaña
  ionViewWillEnter() {
    if (this.currentView === 'listaDeDeseos') {
      this.loadWishlist();
    }
  }

  changeView(viewName: string) {
    this.currentView = viewName;
    // Si el usuario cambia a la vista de la lista de deseos, cargamos los datos
    if (viewName === 'listaDeDeseos') {
      this.loadWishlist();
    }
  }

  async openEditProfileModal() {
    const modal = await this.modalController.create({
      component: EditProfileModalComponent,
      // Pasamos los datos actuales al modal
      componentProps: {
        currentName: this.userName,
        currentEmail: this.userEmail
      }
    });

    await modal.present();

    // Escuchamos por si el modal se cierra y devuelve datos
    const { data } = await modal.onDidDismiss();
    if (data && data.updated) {
      // Si el perfil se actualizó, refrescamos los datos en la página
      this.loadProfileData();
    }
  }

  async openChangePasswordModal() {
    const modal = await this.modalController.create({
      component: ChangePasswordModalComponent
    });
    return await modal.present();
  }

  // 4. Nueva función para cargar los datos desde la API
  loadWishlist() {
    this.wishlistService.getWishlist().subscribe(items => {
      // Le añadimos la propiedad 'isLiked' a cada item para que el corazón aparezca rojo
      this.wishlistItems = items.map(item => ({ ...item, isLiked: true }));
    });
  }

  // 5. Modificamos toggleLike para que elimine el producto de verdad
  toggleLike(item: any) {
    const productId = item.id_producto;

    this.wishlistService.removeFromWishlist(productId).subscribe(() => {
      // Si la eliminación en el backend es exitosa, quitamos el item de la lista localmente
      // para que desaparezca de la pantalla al instante.
      this.wishlistItems = this.wishlistItems.filter(i => i.id_producto !== productId);
    });
  }
}