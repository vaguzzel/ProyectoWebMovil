import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <--- ¡Añade ReactiveFormsModule!

import { IonicModule } from '@ionic/angular';

import { Tab8PageRoutingModule } from './tab8-routing.module';

import { Tab8Page } from './tab8.page';
// Asumo que tienes HeaderComponent y FooterComponent importados/declarados en algún lugar
// Si son Standalone Components, añádelos a 'imports'
// Si son parte de un SharedModule, importa ese SharedModule
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // <--- ¡Asegúrate de que esté aquí!
    IonicModule,
    Tab8PageRoutingModule,
    HeaderComponent, // Ejemplo si HeaderComponent es standalone
    FooterComponent // Ejemplo si FooterComponent es standalone
  ],
  declarations: [Tab8Page]
})
export class Tab8PageModule {}