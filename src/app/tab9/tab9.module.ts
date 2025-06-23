// src/app/tab9/tab9.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab9PageRoutingModule } from './tab9-routing.module';
import { Tab9Page } from './tab9.page';

import { SharedModule } from '../shared/shared.module'; 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab9PageRoutingModule,
    SharedModule 
  ],
  // La declaración aquí es la forma correcta para componentes no-standalone
  declarations: [Tab9Page]
})
export class Tab9PageModule {}