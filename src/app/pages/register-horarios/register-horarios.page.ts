import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonContent,
  IonButton,
  IonIcon,
  IonToggle,
  IonCard,
  IonItem,
  IonInput,
  IonLabel,
} from '@ionic/angular/standalone';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-register-horarios',
  templateUrl: './register-horarios.page.html',
  styleUrls: ['./register-horarios.page.scss'],
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  IonContent,
  IonButton,
  IonIcon,
  IonToggle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonLabel
]

})
export class RegisterHorariosPage implements OnInit {
  diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  horarios: Record<string, any> = {};
  bloqueTiempoMin: number = 60;
  capacidadPorReserva: number = 4;

  constructor(public router: Router) { 
    this.diasSemana.forEach(dia => {
      this.horarios[dia] = {
        abierto: false,
        desde: '12:00',
        hasta: '22:00',
        reservasPorHora: 5
      };
    });
  }

guardarHorarios() {
    const datosRestaurante = JSON.parse(localStorage.getItem('restauranteData') || '{}');

    const datosConHorarios = {
      ...datosRestaurante,
      horarios: this.horarios,
      bloqueTiempoMin: this.bloqueTiempoMin,
      capacidadPorReserva: this.capacidadPorReserva
    };
    if (!datosRestaurante || !datosRestaurante.usuario) {
  console.error('❌ Datos del restaurante no encontrados. No se puede continuar.');
  this.router.navigate(['/register-restaurante']);
  return;
}

    localStorage.setItem('restauranteData', JSON.stringify(datosConHorarios));
    this.router.navigate(['/restaurant-uploads']);
  }

  goBack() {
    this.router.navigate(['/register-restaurante']);
  }


  ngOnInit() {
  }

}
