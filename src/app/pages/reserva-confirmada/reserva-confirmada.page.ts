import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, peopleOutline, calendarOutline } from 'ionicons/icons';

@Component({
  selector: 'app-reserva-confirmada',
  templateUrl: './reserva-confirmada.page.html',
  styleUrls: ['./reserva-confirmada.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardContent
  ]})
export class ReservaConfirmadaPage implements OnInit {
  restauranteNombre: string = '';
  restauranteLogo: string = '';
  nombreUsuario: string = '';
  comensales: number = 0;
  fecha: string = '';
  hora: string = '';
  direccion: string = '';
  telefono: string = '';
  codigoReserva: string = '';

  constructor(public router: Router) {
    addIcons({ arrowBackOutline, peopleOutline, calendarOutline });
  }

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state) {
      this.restauranteNombre = state['restauranteNombre'];
      this.restauranteLogo = state['restauranteLogo'];
      this.nombreUsuario = state['nombreUsuario'];
      this.comensales = state['comensales'];
      this.fecha = state['fecha'];
      this.hora = state['hora'];
      this.direccion = state['direccion'];
      this.telefono = state['telefono'];
      this.codigoReserva = state['codigoReserva'] || 'N/A';
    } else {
      this.router.navigate(['/home-screen']);
    }
  }

  goBack() {
    this.router.navigate(['/home-screen']);
  }

  irAMisReservas() {
    this.router.navigate(['/mis-reservas']);
  }
}
