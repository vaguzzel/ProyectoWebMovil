import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  isAdmin = false;

  constructor(private authService: AuthService) {
    // 4. Suscríbete a los cambios del rol de usuario
    this.authService.userRole$.subscribe(role => {
      this.isAdmin = (role === 'admin');
    });
  }

}
