import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: false
})
export class Tab5Page {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.loginUsuario(this.loginForm.value).subscribe({
      next: (res: any) => {
        // console.log('Respuesta del login:', res); // Puedes quitar o comentar esta línea si ya no la necesitas
        localStorage.setItem('token', res.token);
        // ¡AGREGAR ESTA LÍNEA PARA GUARDAR EL NOMBRE DE USUARIO!
        localStorage.setItem('userName', res.user.nombre); // Guarda el nombre de usuario
        localStorage.setItem('userEmail', res.user.email); // Opcional: también guarda el email
        localStorage.setItem('userRole', res.user.rol); // Opcional: también guarda el rol

        this.router.navigate(['/tabs/tab1']);
      },
      error: async (err) => { // Agregué 'err' para ver el error completo si es necesario
        console.error('Error en el login:', err); // Para depuración
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Credenciales inválidas. Por favor intenta de nuevo.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}