import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';


import { FooterComponent } from '../components/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { StoreCardComponent } from '../components/store-card/store-card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FooterComponent, HeaderComponent, ProductCardComponent, StoreCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    FooterComponent ,
    HeaderComponent,
    ProductCardComponent,
    StoreCardComponent,
    RouterModule
  ]
})
export class SharedModule { }
