import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class ChangePasswordModalComponent implements OnInit {
  passwordForm!: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    this.authService.changePassword(this.passwordForm.value).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({ message: 'Contraseña cambiada exitosamente.', duration: 2000, color: 'success' });
        toast.present();
        this.dismiss();
      },
      error: async (err) => {
        const toast = await this.toastCtrl.create({ message: err.error.message || 'Error al cambiar la contraseña.', duration: 3000, color: 'danger' });
        toast.present();
      }
    });
  }
}