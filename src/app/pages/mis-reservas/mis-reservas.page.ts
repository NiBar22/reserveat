import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonLabel,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSegment,
  IonSegmentButton
} from '@ionic/angular/standalone';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { addIcons } from 'ionicons';
import { arrowBackOutline, star, starOutline, homeOutline, calendarOutline } from 'ionicons/icons';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.page.html',
  styleUrls: ['./mis-reservas.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonCard,
    IonCardContent,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel
  ]})
export class MisReservasPage implements OnInit {
  public estadoActual: string = 'activa';
  public reservasFiltradas: any[] = [];
  public allReservas: any[] = [];

  public constructor(
    public router: Router,
    private firestore: Firestore
  ) {addIcons({arrowBackOutline,star,starOutline,homeOutline,calendarOutline});}

 public ngOnInit() {
  const usuarioActivo = localStorage.getItem('usuarioActivo');
  if (usuarioActivo) {
    this.cargarReservas(usuarioActivo);
  } else {
    console.error("No se encontró usuario activo en localStorage");
    this.router.navigate(['/login']);
  }
}


  private cargarReservas(usuarioActivo: string): void {
    
    const reservasRef = collection(this.firestore, 'reservas');
    const q = query(reservasRef, where('usuario', '==', usuarioActivo));


    collectionData(q, { idField: 'id' })
      .pipe(
        map(reservas => reservas.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()))
      )
      .subscribe({
        next: (reservas) => {
          console.log('Reservas cargadas:', reservas);
          this.allReservas = reservas;
          this.filtrarReservas();
        },
        error: (error) => {
          console.error("Error al cargar las reservas desde Firestore:", error);
        }
      });
  }

  public filtrarReservas(): void {
    console.log('Filtrando por estado:', this.estadoActual);
console.log('Reservas filtradas:', this.reservasFiltradas);

  this.reservasFiltradas = this.allReservas.filter(r =>
    r.estado?.toLowerCase() === this.estadoActual.toLowerCase()
  );
}


  public calificarReserva(reserva: any): void {
  const reservaConLogo = {
    ...reserva,
    restauranteLogo: reserva.restauranteLogo || reserva.logoUrl || '',
    restauranteNombre: reserva.restauranteNombre || reserva.nombre || '',
  };

  this.router.navigate(['/review'], { state: { reserva: reservaConLogo } });
}


  public goBack(): void {
    this.router.navigate(['/home-screen']);
  }

  public irAMisReviews(): void {
  this.router.navigate(['/mis-reviews']);
}

public irAHome(): void {
  this.router.navigate(['/home-screen']);
}

public irAMisReservas(): void {
  this.router.navigate(['/mis-reservas']);
}

}