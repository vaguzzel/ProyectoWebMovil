import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  // 1. Variable para guardar el estado actual (nuestra "pizarra")
  //    Inicialmente mostramos 'perfil'
  public currentView: string = 'perfil';

  constructor() {}

  // 2. Método para cambiar el estado actual
  changeView(viewName: string) {
    this.currentView = viewName;
    console.log('Vista cambiada a:', this.currentView); // Para depuración
  }
}
