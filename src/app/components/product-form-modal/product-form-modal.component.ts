    import { Component, Input, OnInit } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { ModalController, ToastController } from '@ionic/angular';
    import { ProductService } from 'src/app/services/product.service';
    
    // Imports para Standalone Component
    import { CommonModule } from '@angular/common';
    import { ReactiveFormsModule } from '@angular/forms';
    import { IonicModule } from '@ionic/angular';

    @Component({
      selector: 'app-product-form-modal',
      templateUrl: './product-form-modal.component.html',
      styleUrls: ['./product-form-modal.component.scss'],
      standalone: true, // ¡Importante!
      imports: [CommonModule, ReactiveFormsModule, IonicModule] // ¡Importante!
    })
    export class ProductFormModalComponent implements OnInit {
      @Input() productToEdit: any;
      
      productForm!: FormGroup;
      isEditMode = false;
      // Aquí deberías cargar las marcas y categorías desde tu API
      marcas: any[] = []; 
      categorias: any[] = [];

      constructor(
        private fb: FormBuilder,
        private modalCtrl: ModalController,
        private productService: ProductService,
        private toastCtrl: ToastController
      ) {}

      ngOnInit() {
        this.isEditMode = !!this.productToEdit;
        this.initForm();
        // TODO: Llama a servicios para cargar marcas y categorías en los <ion-select>
      }

      initForm() {
        this.productForm = this.fb.group({
          nombre: [this.productToEdit?.nombre || '', Validators.required],
          descripcion: [this.productToEdit?.descripcion || '', Validators.required],
          marca_id: [this.productToEdit?.marca_id || null, Validators.required],
          categoria_id: [this.productToEdit?.categoria_id || null, Validators.required],
          image_url: [this.productToEdit?.image_url || 'assets/images/placeholder.png'] // Manejo de imagen simple por ahora
        });
      }

      dismiss(reloaded = false) {
        this.modalCtrl.dismiss({ reloaded });
      }

      async onSubmit() {
        if (this.productForm.invalid) {
          this.presentToast('Por favor, completa todos los campos requeridos.', 'warning');
          return;
        }

        const action = this.isEditMode 
          ? this.productService.updateProduct(this.productToEdit.id_producto, this.productForm.value)
                    : this.productService.createProduct(this.productForm.value);

        action.subscribe({
          next: () => {
            const message = this.isEditMode ? 'Producto actualizado.' : 'Producto creado.';
            this.presentToast(message, 'success');
            this.dismiss(true); // Cierra el modal y avisa que se debe recargar la lista
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
    