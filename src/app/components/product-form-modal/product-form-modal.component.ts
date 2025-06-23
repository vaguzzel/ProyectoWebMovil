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
  marcas: any[] = []; 
  categorias: any[] = [];
  tiendas: any[] = [];

  selectedFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;

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
    if (this.isEditMode && this.productToEdit.image_url) {
      this.imagePreviewUrl = 'http://localhost:5000/' + this.productToEdit.image_url;
    }
    this.initForm();
    this.loadInitialData();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Generar una URL local para la vista previa instantánea
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
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
      // El campo 'image_url' se elimina del formulario, ya que ahora manejamos un archivo.
      ofertas: this.fb.array([])
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

    // 1. Crear un objeto FormData para poder enviar el archivo
    const formData = new FormData();

    // 2. Añadir todos los campos de texto del formulario al FormData
    formData.append('nombre', this.productForm.get('nombre')?.value);
    formData.append('descripcion', this.productForm.get('descripcion')?.value);
    formData.append('marca_id', this.productForm.get('marca_id')?.value);
    formData.append('categoria_id', this.productForm.get('categoria_id')?.value);
    
    // 3. Convertir el array de ofertas a un string JSON y añadirlo
    formData.append('ofertas', JSON.stringify(this.productForm.get('ofertas')?.value));

    // 4. Si se seleccionó un nuevo archivo de imagen, añadirlo al FormData
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    // El resto de la lógica para llamar al servicio es casi igual, pero enviamos formData
    const action = this.isEditMode 
      ? this.productService.updateProductWithOffers(this.productToEdit.id_producto, formData)
      : this.productService.createProductWithOffers(formData);
      
    action.subscribe({
      next: () => {
        const message = this.isEditMode ? 'Producto actualizado con éxito.' : 'Producto creado con éxito.';
        this.presentToast(message, 'success');
        this.dismiss({ reloaded: true });
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Ocurrió un error al guardar el producto.';
        this.presentToast(errorMessage, 'danger');
        console.error(err);
      }
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000, color });
    toast.present();
  }
}
