// src/app/product-list/product-list.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductListPageRoutingModule } from './product-list-routing.module';
import { ProductListPage } from './product-list.page';
import { SharedModule } from '../shared/shared.module'; // <-- AÑADIR ESTA LÍNEA

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductListPageRoutingModule,
    SharedModule 
  ],
  declarations: [ProductListPage]
})
export class ProductListPageModule {}