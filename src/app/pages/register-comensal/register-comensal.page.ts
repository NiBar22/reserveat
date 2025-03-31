import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonSelect, IonSelectOption, IonIcon,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow,IonHeader, IonTitle, IonToolbar, IonButtons} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { logoIonic, arrowUndoOutline, imageOutline, arrowBackOutline, alertCircleOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-register-comensal',
  templateUrl: './register-comensal.page.html',
  styleUrls: ['./register-comensal.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, IonSelect, IonSelectOption, IonIcon, CommonModule, FormsModule,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonHeader, IonTitle, IonToolbar, IonButtons, RouterModule]
})
export class RegisterComensalPage {
  usuario: string = '';
  nombres: string = '';
  apellidos: string = '';
  direccion: string = '';
  telefono: string = '';
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  password: string = '';
  confirmPassword: string = '';
  fotoPerfil: string | null = null;
  errorMensaje: string = '';
  

  constructor(public router: Router) {
    addIcons({arrowBackOutline,imageOutline,alertCircleOutline,arrowUndoOutline,logoIonic});
  }

  allFieldsEmpty(): boolean {
    return (
      !this.usuario.trim() &&
      !this.nombres.trim() &&
      !this.apellidos.trim() &&
      !this.direccion.trim() &&
      !this.telefono.trim() &&
      !this.tipoDocumento &&
      !this.numeroDocumento.trim() &&
      !this.password.trim() &&
      !this.confirmPassword.trim()
    );
  }
  registrar() {
    this.errorMensaje = '';
    
    // Verificación detallada de campos vacíos
    const camposFaltantes = [];
    if (!this.usuario.trim()) camposFaltantes.push('Usuario');
    if (!this.nombres.trim()) camposFaltantes.push('Nombres');
    if (!this.apellidos.trim()) camposFaltantes.push('Apellidos');
    if (!this.direccion.trim()) camposFaltantes.push('Dirección');
    if (!this.telefono.trim()) camposFaltantes.push('Teléfono');
    if (!this.tipoDocumento) camposFaltantes.push('Tipo de Documento');
    if (!this.numeroDocumento.trim()) camposFaltantes.push('Número de Documento');
    if (!this.password.trim()) camposFaltantes.push('Contraseña');
    if (!this.confirmPassword.trim()) camposFaltantes.push('Confirmar Contraseña');

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
    this.router.navigate(['/select-filters'], { queryParams: { userType: 'comensal' } });

  }


  async seleccionarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    if (image.dataUrl) {
      this.fotoPerfil = image.dataUrl;
    }
  }

}
