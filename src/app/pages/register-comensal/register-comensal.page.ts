import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonInput, IonButton, IonSelect, IonSelectOption,
  IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCol, IonGrid, IonRow, IonHeader, IonTitle, IonToolbar, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, arrowUndoOutline, imageOutline, arrowBackOutline, alertCircleOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-register-comensal',
  templateUrl: './register-comensal.page.html',
  styleUrls: ['./register-comensal.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonInput, IonButton, IonSelect, IonSelectOption, IonIcon,
    CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
    IonCardTitle, IonCol, IonGrid, IonRow, IonHeader, IonTitle, IonToolbar, IonButtons,
    RouterModule
  ]
})
export class RegisterComensalPage {
  archivoSeleccionado: File | null = null;
  fotoPerfil: string | ArrayBuffer | null = null;

  usuario: string = '';
  nombres: string = '';
  apellidos: string = '';
  direccion: string = '';
  telefono: string = '';
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMensaje: string = '';

  constructor(
    public router: Router,
    private userService: UserService
  ) {
    addIcons({ arrowBackOutline, imageOutline, alertCircleOutline, arrowUndoOutline, logoIonic });
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

  if (
    !this.usuario.trim() ||
    !this.nombres.trim() ||
    !this.apellidos.trim() ||
    !this.direccion.trim() ||
    !this.telefono.trim() ||
    !this.tipoDocumento ||
    !this.numeroDocumento.trim() ||
    !this.password.trim() ||
    !this.confirmPassword.trim()
  ) {
    this.errorMensaje = 'Por favor, completa todos los campos.';
    return;
  }
  if (this.password !== this.confirmPassword) {
    this.errorMensaje = 'Las contraseñas no coinciden';
    return;
  }

  this.errorMensaje = '';
  
  const db = getFirestore();
  const comensalesRef = collection(db, 'comensales');

  this.subirFotoPerfil(async (fotoURL) => {
    const nuevoComensal = {
      usuario: this.usuario,
      nombres: this.nombres,
      apellidos: this.apellidos,
      direccion: this.direccion,
      telefono: this.telefono,
      tipoDocumento: this.tipoDocumento,
      numeroDocumento: this.numeroDocumento,
      password: this.password,
      tipo: 'comensal',
      fotoURL: fotoURL || ''
    };

    try {
      const docRef = await addDoc(comensalesRef, nuevoComensal);
const comensalFinal = {
  ...nuevoComensal,
  id: docRef.id
};

localStorage.setItem('comensalData', JSON.stringify(comensalFinal));
this.router.navigate(['/select-filters']);

this.router.navigate(['/select-filters']);

    } catch (error) {
      console.error('Error al registrar comensal:', error);
      this.errorMensaje = 'Error al registrar comensal. Intenta de nuevo.';
    }
  });
}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPerfil = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async subirFotoPerfil(onSuccess: (url: string) => void) {
  if (!this.archivoSeleccionado) {
    onSuccess('');
    return;
  }

  try {
    const storage = getStorage();
    const uniqueName = `${Date.now()}-${this.usuario || 'img'}`;
    const ref = storageRef(storage, `comensales/${uniqueName}`);
    const snapshot = await uploadBytes(ref, this.archivoSeleccionado);
    const downloadURL = await getDownloadURL(snapshot.ref);
    onSuccess(downloadURL);
  } catch (error) {
    console.error('❌ Error al subir imagen:', error);
    onSuccess('');
  }
}


  public goBack(): void {
  this.router.navigate(['/register-selection']);
}

}
