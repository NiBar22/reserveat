import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent
 } from '@ionic/angular/standalone';
 

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
  standalone: true,
    imports: [CommonModule,IonContent, IonIcon, IonButton, IonHeader, IonToolbar, IonButtons, IonCard, IonCardContent, IonTitle]
})
export class RestaurantDetailPage implements OnInit {
  restaurant: any = null;

  constructor(
    public router: Router,
    private route: ActivatedRoute
  ) {addIcons({arrowBackOutline});}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        try {
          this.restaurant = JSON.parse(params['data']);
        } catch (e) {
          console.error('Error parsing restaurant data:', e);
          this.router.navigate(['/home-screen']);
        }
      } else {
        this.router.navigate(['/home-screen']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/home-screen']);
  }

  reservar(): void {
    this.router.navigate(['/reserva'], {
      state: {
        id: this.restaurant.id,
        nombre: this.restaurant.nombreRestaurante,
        logoUrl: this.restaurant.logoUrl,
        horarios: this.restaurant.horarios,
        direccion: this.restaurant.direccion || '',
        telefono: this.restaurant.telefono || ''
      }
    });
  }
}
