    import { Injectable } from '@angular/core';
    import { CanActivate, Router } from '@angular/router';
    import { AuthService } from 'src/app/services/auth.service';
    import { ToastController } from '@ionic/angular';

    @Injectable({
      providedIn: 'root'
    })
    export class AdminGuard implements CanActivate {

      constructor(
        private authService: AuthService,
        private router: Router,
        private toastCtrl: ToastController
      ) {}

      canActivate(): boolean {
        const userRole = this.authService.getUserRole();
        if (this.authService.isLoggedIn() && userRole === 'admin') {
          return true; // El usuario es admin, permite el acceso
        } else {
          // Si no es admin, redirige al inicio y muestra un mensaje
          this.presentToast('Acceso denegado. Se requiere rol de Administrador.', 'danger');
          this.router.navigate(['/tabs/tab1']);
          return false;
        }
      }
      
      async presentToast(message: string, color: string) {
        const toast = await this.toastCtrl.create({ message, duration: 3000, color });
        toast.present();
      }
    }
    