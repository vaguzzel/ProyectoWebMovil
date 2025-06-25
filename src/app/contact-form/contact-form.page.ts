// src/app/pages/contacto-form/contacto-form.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact-form', // <-- Actualizado
  templateUrl: './contact-form.page.html', // <-- Actualizado
  styleUrls: ['./contact-form.page.scss'], // <-- Actualizado
  standalone: false
})

export class ContactFormPage { // <-- Clase actualizada
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      ayuda: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // Marca todos los campos para mostrar errores
      return;
    }
    
    this.isSubmitting = true;

    // URL de endpoint formspree
    const formspreeUrl = 'https://formspree.io/f/mrbkoygv'; 

    const headers = new HttpHeaders({ 'Accept': 'application/json' });

    this.http.post(formspreeUrl, this.contactForm.value, { headers: headers })
      .subscribe({
        next: (response) => {
          this.presentToast('¡Mensaje enviado con éxito!', 'success');
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error al enviar el formulario', error);
          this.presentToast('Hubo un error al enviar el mensaje.', 'danger');
          this.isSubmitting = false;
        }
      });
  }

  // Helper para mostrar mensajes (toasts)
  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color,
    });
    toast.present();
  }
}