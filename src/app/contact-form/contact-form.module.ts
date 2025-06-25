import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { ContactFormPageRoutingModule } from './contact-form-routing.module';
import { ContactFormPage } from './contact-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactFormPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ContactFormPage]
})
export class ContactFormPageModule {}
