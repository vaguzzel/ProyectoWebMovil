import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../components/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, ProductCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    FooterComponent ,
    HeaderComponent,
    ProductCardComponent
  ]
})
export class SharedModule { }
