// src/app/tab1/tab1.module.ts
import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page'; // Importación corregida
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ProductCardComponent } from '../components/product-card/product-card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
  ],
  declarations: [Tab1Page, ProductCardComponent], // Añadido Tab1Page aquí
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class Tab1PageModule {}