import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonInput, IonButton, IonIcon, IonCard, IonCardContent, IonCol, 
  IonGrid, IonRow, IonHeader, IonTitle, IonToolbar, IonButtons 
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { logoIonic, arrowBackOutline, imageOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-restaurante',
  templateUrl: './register-restaurante.page.html',
  styleUrls: ['./register-restaurante.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonInput, IonButton, IonIcon, CommonModule, FormsModule, 
    IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonHeader, IonTitle, 
    IonToolbar, IonButtons,RouterModule
  ]
})
export class RegisterRestaurantePage {
  nombreRestaurante: string = '';
  nit: string = '';
  propietarioNombre: string = '';
  propietarioApellidos: string = '';
  direccion: string = '';
  telefono: string = '';
  usuario: string = '';
  password: string = '';
  confirmPassword: string = '';
  logo: string | null = null;
  errorMensaje: string = '';

  constructor(public router: Router) {
    addIcons({ arrowBackOutline, imageOutline, logoIonic });
  }

  generarUsuario() {
    if (this.nombreRestaurante.trim() && this.nit.length >= 3) {
      const nitUltimosTres = this.nit.slice(-3);
      this.usuario = `res_${this.nombreRestaurante.replace(/\s+/g, '').toLowerCase()}${nitUltimosTres}`;
    } else {
      this.usuario = '';
    }
  }

  camposVacios(): boolean {
    return (
      !this.usuario.trim() &&
      !this.nombreRestaurante.trim() &&
      !this.nit.trim() &&
      !this.propietarioNombre.trim() &&
      !this.propietarioApellidos.trim() &&
      !this.direccion &&
      !this.telefono.trim() &&
      !this.password.trim() &&
      !this.confirmPassword.trim() &&
      !this.logo?.trim()
    );
  }

  registrar() {
    this.errorMensaje = '';

    const camposFaltantes = [];
    if (!this.usuario.trim()) camposFaltantes.push('Usuario');
    if (!this.nombreRestaurante.trim()) camposFaltantes.push('Nombre del restaurante');
    if (!this.nit.trim()) camposFaltantes.push('NIT');
    if (!this.propietarioNombre.trim()) camposFaltantes.push('Nombre del propietario');
    if (!this.propietarioApellidos.trim()) camposFaltantes.push('Apellidos del propietario');
    if (!this.direccion) camposFaltantes.push('Direccion');
    if (!this.telefono.trim()) camposFaltantes.push('Teléfono');
    if (!this.password.trim()) camposFaltantes.push('Contraseña');
    if (!this.confirmPassword.trim()) camposFaltantes.push('Confirmar Contraseña');
    if (!this.logo?.trim()) camposFaltantes.push('Logo');

    if (camposFaltantes.length > 0) {
      this.errorMensaje = `Faltan campos requeridos: ${camposFaltantes.join(', ')}`;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMensaje = 'Las contraseñas no coinciden';
      return;
    }
    // Validación adicional de teléfono 
    if (!/^\d+$/.test(this.telefono)) {
      this.errorMensaje = 'El teléfono solo debe contener números';
      return;
    }

    console.log('Registro exitoso');
    this.router.navigate(['/select-filters'], { queryParams: { userType: 'restaurant' } });

  }
  

  async seleccionarLogo() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    if (image.dataUrl) {
      this.logo = image.dataUrl;
    }
  }
}
