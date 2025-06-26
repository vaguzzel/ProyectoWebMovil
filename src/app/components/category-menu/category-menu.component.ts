import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, IonicModule} from '@ionic/angular';
import { Category } from 'src/app/services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
  // Importamos los módulos que este componente necesita para su plantilla
  imports: [
    CommonModule, // Necesario para usar *ngFor
    IonicModule   // Necesario para usar <ion-list>, <ion-item>, <ion-label>
  ]
})
export class CategoryMenuComponent {
  // Recibimos la lista de categorías desde el componente que nos llama (el Header)
  @Input() categories: Category[] = [];

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router
  ) { }

  // Función para navegar y CERRAR el popover
  navigateToCategory(categoryId: number) {
    this.router.navigate(['/products/category', categoryId]);
    this.popoverCtrl.dismiss(); // Cierra el popover al hacer clic
  }
}