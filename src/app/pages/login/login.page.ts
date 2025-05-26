import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addIcons } from 'ionicons';
import { alertCircleOutline } from 'ionicons/icons';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, CommonModule, FormsModule, IonIcon]
})
export class LoginPage implements OnInit {
public errorMensaje: string = '';
  usuario: string = '';
  password: string = '';

  constructor(private firestore: Firestore,
    public router: Router) {addIcons({alertCircleOutline});}

  ngOnInit() {
  const navState = window.history.state;
  if (navState && navState.restauranteCreado) {
    this.errorMensaje = '¡Restaurante creado con éxito!';
  }
}


  async login(): Promise<void> {
    if (!this.usuario || !this.password) {
      this.errorMensaje = 'Todos los campos son obligatorios.';
      return;
    }

    try {
      const comensalesRef = collection(this.firestore, 'comensales');
      const comensales = await firstValueFrom(
        collectionData(comensalesRef, { idField: 'id' })
      );

      const usuarioEncontrado = comensales.find((comensal: any) =>
        comensal.usuario === this.usuario && comensal.password === this.password
      );

      if (!usuarioEncontrado) {
        this.errorMensaje = 'Usuario o contraseña incorrectos.';
        return;
      }

      
      localStorage.setItem('usuarioActivo', this.usuario);

      
      this.router.navigate(['/home-screen'], {
        state: { usuario: this.usuario }
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.errorMensaje = 'Ocurrió un error inesperado. Intenta nuevamente.';
    }
  }




  goToRegister() {
    this.router.navigate(['/register-selection']);
  }

  forgotPassword() {
    console.log('Recuperar contraseña');
  }
}
