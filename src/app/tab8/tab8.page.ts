import { Component, OnInit } from '@angular/core'; // <--- Añade OnInit
import { SupportService } from '../services/support.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // <--- ¡NUEVAS IMPORTACIONES IMPORTANTES!

@Component({
  selector: 'app-tab8',
  templateUrl: './tab8.page.html',
  styleUrls: ['./tab8.page.scss'],
  standalone: false
})
export class Tab8Page implements OnInit { // <--- Implementa OnInit

  soporteForm!: FormGroup; // <--- Declara tu FormGroup
  enviando: boolean = false; // <--- Nueva propiedad para el spinner del botón

  constructor(
    private supportService: SupportService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private fb: FormBuilder // <--- ¡Inyecta FormBuilder!
  ) { }

  ngOnInit() { // <--- Inicializa el formulario al iniciar el componente
    this.soporteForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''], // Opcional, sin validador requerido
      tipoConsulta: ['', Validators.required],
      prioridad: ['', Validators.required],
      asunto: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Método para obtener la longitud de la descripción para el contador de caracteres
  getDescripcionLength(): number {
    return this.soporteForm.get('descripcion')?.value?.length || 0;
  }

  async enviarTicket() { // <--- Renombrado a 'enviarTicket' para coincidir con el HTML
    // Verifica si el formulario es inválido
    if (this.soporteForm.invalid) {
      this.soporteForm.markAllAsTouched(); // Marca todos los campos como 'touched' para mostrar errores de validación
      this.presentAlert('Formulario Inválido', 'Por favor, completa todos los campos requeridos correctamente.');
      return;
    }

    this.enviando = true; // Activa el estado de envío para el spinner
    const loading = await this.loadingController.create({
      message: 'Enviando...',
    });
    await loading.present();

    // Mapea los datos del formulario a la estructura que espera tu función de Firebase
    const ticketData = {
      nombre: this.soporteForm.value.nombre,
      email: this.soporteForm.value.email,
      telefono: this.soporteForm.value.telefono,
      tipoConsulta: this.soporteForm.value.tipoConsulta,
      prioridad: this.soporteForm.value.prioridad,
      asunto: this.soporteForm.value.asunto,
      descripcion: this.soporteForm.value.descripcion,
    };

    this.supportService.sendTicket(ticketData).subscribe( // <--- Envía los datos mapeados
      async (response) => {
        await loading.dismiss();
        this.enviando = false; // Desactiva el estado de envío
        this.presentAlert('Éxito', 'Tu ticket ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.');
        this.soporteForm.reset(); // Reinicia el formulario
        // Opcional: reestablece valores iniciales para selects si no se borran con reset()
        this.soporteForm.get('tipoConsulta')?.setValue('');
        this.soporteForm.get('prioridad')?.setValue('');
      },
      async (error) => {
        await loading.dismiss();
        this.enviando = false; // Desactiva el estado de envío
        console.error('Error al enviar el ticket:', error);

        // Mensajes de error más útiles
        let errorMessage = 'Hubo un problema al enviar tu ticket. Por favor, inténtalo de nuevo más tarde.';
        if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet o la URL de la función.';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message; // Usa el mensaje del backend si está disponible
        } else if (error.message) {
          errorMessage = error.message;
        }
        this.presentAlert('Error', errorMessage);
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}