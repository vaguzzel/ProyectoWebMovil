import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false
})
export class Tab4Page {

  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    // Actualizamos el formulario con todos los campos requeridos
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      rut: ['', [Validators.required]], // 👈 Campo nuevo
      email: ['', [Validators.required, Validators.email]],
      region: ['', [Validators.required]], // 👈 Campo nuevo
      comuna: ['', [Validators.required]], // 👈 Campo nuevo
      password: ['', [Validators.required, Validators.minLength(6)]], // 👈 Nombre actualizado
    });
  }

  // El resto de la lógica de este archivo (el método registrar(), etc.)
  // no necesita cambios, ya que está diseñado para enviar el
  // objeto completo que genera el formulario.
  registrar() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const datosUsuario = this.registroForm.value;
    console.log('Enviando datos completos:', datosUsuario);

    this.authService.registrarUsuario(datosUsuario).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito:', response);
        this.mostrarAlerta('¡Éxito!', 'Tu cuenta ha sido creada.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        this.mostrarAlerta('Error', 'No se pudo completar el registro. Inténtalo de nuevo.');
      }
    });
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}