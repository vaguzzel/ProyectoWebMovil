import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormModalComponent } from 'src/app/components/product-form-modal/product-form-modal.component';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
  standalone: false
})
export class Tab7Page implements OnInit {
  products: any[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    // No cargamos aquí para que se actualice cada vez que se entra a la pestaña
  }

  ionViewWillEnter() {
    // Usamos ionViewWillEnter para que la lista se recargue cada vez que se muestra la página
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.isLoading = false;
        this.presentToast('Error al cargar la lista de productos.', 'danger');
      }
    });
  }

  async openProductModal(product: any = null) {
    let productToEdit = null;

    // Si estamos editando, necesitamos obtener todos los detalles del producto, incluyendo sus ofertas
    if (product) {
      try {
        productToEdit = await this.productService.getProductById(product.id_producto).toPromise();
      } catch (err) {
        this.presentToast('No se pudieron cargar los detalles del producto.', 'danger');
        return;
      }
    }

    const modal = await this.modalCtrl.create({
      component: ProductFormModalComponent,
      componentProps: {
        productToEdit: productToEdit // Pasamos el producto completo con ofertas
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.reloaded) {
      this.loadProducts();
    }
  }

  async confirmDelete(product: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que quieres eliminar el producto "${product.nombre}"? Esta acción no se puede deshacer.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', handler: () => this.deleteProduct(product.id_producto) }
      ]
    });
    await alert.present();
  }

  private deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.presentToast('Producto eliminado exitosamente.', 'success');
        this.loadProducts();
      },
      error: (err) => {
        this.presentToast('Error al eliminar el producto.', 'danger');
        console.error('Error al eliminar:', err);
      }
    });
  } 

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000, color });
    toast.present();
}
}
