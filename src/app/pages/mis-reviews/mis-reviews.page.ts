import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { arrowBackOutline, star, starOutline, homeOutline, calendarOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-mis-reviews',
  templateUrl: './mis-reviews.page.html',
  styleUrls: ['./mis-reviews.page.scss'],
  standalone: true,
  imports: [CommonModule,
    IonicModule,]
})
export class MisReviewsPage implements OnInit {

  public misReviews: any[] = [];

  constructor(public router: Router,
    private firestore: Firestore) {addIcons({arrowBackOutline,star,starOutline,homeOutline,calendarOutline}); }

  ngOnInit() {
    this.cargarReviews();
  }

  cargarReviews() {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const reviewsRef = collection(this.firestore, 'reviews');
    const q = query(reviewsRef, where('comensalId', '==', usuarioActivo));

    collectionData(q).subscribe({
      next: (data: any[]) => {
        this.misReviews = data;
      },
      error: (err) => {
        console.error('Error cargando reviews:', err);
      }
    });
  }

  obtenerLogo(id: string): string {
    return ''; 
  }

  obtenerNombre(id: string): string {
    return ''; 
  }

  goBack(): void {
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
