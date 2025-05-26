import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { arrowBackOutline, starOutline, homeOutline, calendarOutline, star } from 'ionicons/icons';
import { IonContent} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent
 } from '@ionic/angular/standalone';
 import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Firestore, collection, query, where, orderBy, limit, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
  standalone: true,
    imports: [CommonModule,IonContent, IonIcon, IonButton, IonCard, IonCardContent ]
})
export class RestaurantDetailPage implements OnInit {
  restaurant: any = null;
  direccionMapUrl: SafeResourceUrl = '';
  reviews$: Observable<any[]> | undefined;



  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private firestore: Firestore
  ) {addIcons({arrowBackOutline,star,starOutline,homeOutline,calendarOutline});}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        try {
          this.restaurant = JSON.parse(params['data']);
if (this.restaurant?.direccion) {
  const url = 'https://www.google.com/maps?q=' + encodeURIComponent(this.restaurant.direccion) + '&output=embed';
this.direccionMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

}

this.obtenerReviewsRecientes(this.restaurant.id);


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

  public irAMisReviews(): void {
  this.router.navigate(['/mis-reviews']);
}

public irAHome(): void {
  this.router.navigate(['/home-screen']);
}

public irAMisReservas(): void {
  this.router.navigate(['/mis-reservas']);
}
obtenerReviewsRecientes(idRestaurante: string) {
  const reviewsRef = collection(this.firestore, 'reviews');
  const q = query(
    reviewsRef,
    where('restauranteId', '==', idRestaurante),
    orderBy('fecha', 'desc'),
    limit(3)
  );

  this.reviews$ = collectionData(q, { idField: 'id' }).pipe(
    map((reviews: any[]) =>
      reviews.map(r => ({
        ...r,
        promedio: Number(r.promedio) 
      }))
    )
  );
}

public parseNumber(value: any): number {
  return parseFloat(value);
}



}
