import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from 'src/app/services/brand.service'; 
import { forkJoin } from 'rxjs';

// Imports para Standalone Component
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-product-form-modal',
  templateUrl: './product-form-modal.component.html',
  styleUrls: ['./product-form-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class ProductFormModalComponent implements OnInit {
  @Input() productToEdit: any;

  productForm!: FormGroup;
  isEditMode = false;
  
  // Datos para los desplegables
  marcas: any[] = []; // Suponiendo que las tienes de algún servicio o son estáticas
  categorias: any[] = [];
  tiendas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private productService: ProductService,
    private tiendaService: TiendaService,
    private categoryService: CategoryService,
    private brandService: BrandService, 
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.isEditMode = !!this.productToEdit;
    this.initForm();
    this.loadInitialData();
  }

  // Carga los datos necesarios para los menús desplegables
  loadInitialData() {
    // Usamos forkJoin para ejecutar ambas peticiones en paralelo
    forkJoin({
      categorias: this.categoryService.getCategories(),
      tiendas: this.tiendaService.getTiendas(),
      marcas: this.brandService.getBrands()
      // Podrías añadir aquí el servicio de marcas si lo tienes
    }).subscribe(({ categorias, tiendas, marcas }) => {
      this.categorias = categorias;
      this.tiendas = tiendas;
      this.marcas = marcas; // 4. GUARDAR LAS MARCAS

      // Si estamos en modo edición, poblamos las ofertas existentes
      if (this.isEditMode && this.productToEdit.ofertas) {
        this.productToEdit.ofertas.forEach((offer: any) => this.addOffer(offer));
      }
    });
  }

  initForm() {
    this.productForm = this.fb.group({
      nombre: [this.productToEdit?.nombre || '', Validators.required],
      descripcion: [this.productToEdit?.descripcion || ''],
      marca_id: [this.productToEdit?.marca_id || null, Validators.required], 
      categoria_id: [this.productToEdit?.categoria_id || null, Validators.required],
      image_url: [this.productToEdit?.image_url || 'assets/images/placeholder.png'],
      ofertas: this.fb.array([]) // Inicializamos el FormArray vacío
    });
  }

  // Getter para acceder fácilmente al FormArray de ofertas desde el HTML
  get ofertasFormArray() {
    return this.productForm.get('ofertas') as FormArray;
  }

  // Crea un FormGroup para una nueva oferta
  createOfferGroup(offer: any = {}): FormGroup {
    return this.fb.group({
      id_tienda: [offer.id_tienda || null, Validators.required],
      precio: [offer.precio || '', [Validators.required, Validators.min(1)]],
      stock: [offer.stock || 0, [Validators.required, Validators.min(0)]],
      url_producto: [offer.url_producto || '']
    });
  }

  // Añade una nueva oferta al FormArray
  addOffer(offer: any = {}) {
    this.ofertasFormArray.push(this.createOfferGroup(offer));
  }

  // Elimina una oferta del FormArray por su índice
  removeOffer(index: number) {
    this.ofertasFormArray.removeAt(index);
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  async onSubmit() {
    if (this.productForm.invalid) {
      this.presentToast('Por favor, revisa el formulario. Hay campos inválidos.', 'warning');
      return;
    }

    // Usaremos el servicio que ya tienes preparado
    const action = this.isEditMode
      ? this.productService.updateProductWithOffers(this.productToEdit.id_producto, this.productForm.value)
      : this.productService.createProductWithOffers(this.productForm.value);

    action.subscribe({
      next: () => {
        const message = this.isEditMode ? 'Producto actualizado con éxito.' : 'Producto creado con éxito.';
        this.presentToast(message, 'success');
        this.dismiss({ reloaded: true }); // Avisamos a la página anterior que debe recargar
      },
      error: (err) => {
        this.presentToast('Ocurrió un error al guardar el producto.', 'danger');
        console.error(err);
      }
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000, color });
    toast.present();
  }
}
