import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class EditProfileModalComponent implements OnInit {
  @Input() currentName!: string;
  @Input() currentEmail!: string;

  profileForm!: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      nombre: [this.currentName, [Validators.required]],
      email: [this.currentEmail, [Validators.required, Validators.email]],
    });
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  async onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({ message: 'Perfil actualizado exitosamente.', duration: 2000, color: 'success' });
        toast.present();
        this.dismiss({ updated: true }); // Devolvemos que se actualizó
      },
      error: async (err) => {
        const toast = await this.toastCtrl.create({ message: err.error.message || 'Error al actualizar.', duration: 3000, color: 'danger' });
        toast.present();
      }
    });
  }
}