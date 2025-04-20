import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../components/footer/footer.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    FooterComponent 
  ]
})
export class SharedModule { }
