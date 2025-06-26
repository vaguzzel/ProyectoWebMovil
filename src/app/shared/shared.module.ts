import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../components/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { StoreCardComponent } from '../components/store-card/store-card.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryMenuComponent } from '../components/category-menu/category-menu.component';


@NgModule({
  declarations: [FooterComponent, HeaderComponent, ProductCardComponent, StoreCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    CategoryMenuComponent
  ],
  exports: [
    CommonModule,
    IonicModule,
    FooterComponent ,
    HeaderComponent,
    ProductCardComponent,
    StoreCardComponent,
    CategoryMenuComponent
  ]
})
export class SharedModule { }
