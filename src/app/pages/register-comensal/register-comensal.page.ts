import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonSelect, IonSelectOption, IonIcon,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow,IonHeader, IonTitle, IonToolbar, IonButtons} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { logoIonic, arrowUndoOutline, imageOutline, arrowBackOutline, alertCircleOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

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
  

  constructor(public router: Router, private userService: UserService) {
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
  if (this.password !== this.confirmPassword) {
    this.errorMensaje = 'Las contraseñas no coinciden';
    return;
  }

  const nuevoComensal = {
    nombres: this.nombres,
    apellidos: this.apellidos,
    direccion: this.direccion,
    telefono: this.telefono,
    tipoDocumento: this.tipoDocumento,
    numeroDocumento: this.numeroDocumento,
    usuario: this.usuario,
    password: this.password,
    tipo: 'comensal'
  };

  try {
    // Guardar datos temporalmente
    localStorage.setItem('comensalData', JSON.stringify(nuevoComensal));

    // Navegar a la selección de filtros
    this.router.navigate(['/select-filters'], {
      queryParams: { userType: 'comensal' }
    });
  } catch (error) {
    console.error('Error al preparar registro de comensal:', error);
    this.errorMensaje = 'Ocurrió un error. Intenta de nuevo.';
  }
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
