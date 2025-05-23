import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss']
})
export class HomeScreenPage implements OnInit {
  featuredRestaurants: any[] = [];
  secondaryRestaurants: any[] = [];
  verticalRestaurants: any[] = [];

  constructor(private firestore: Firestore, public router: Router) {}

  ngOnInit() {
  const restaurantesRef = collection(this.firestore, 'restaurantes');
  collectionData(restaurantesRef, { idField: 'id' }).subscribe((restaurantes: any[]) => {
    // Aseguramos que cada restaurante tenga al menos una imagen
    const conImagen = restaurantes.filter(r => r.imagenes?.length > 0);

    this.featuredRestaurants = conImagen.slice(0, 3).map(r => ({
      ...r,
  logoUrl: r.logoUrl || r.imagenes?.[0] || 'assets/default-image.jpg',
  name: r.nombreRestaurante || 'Nombre no disponible'
}));

this.secondaryRestaurants = conImagen.slice(3, 9).map(r => ({
  ...r,
  logoUrl: r.logoUrl || r.imagenes?.[0] || 'assets/default-image.jpg',
  name: r.nombreRestaurante || 'Nombre no disponible'
}));

this.verticalRestaurants = conImagen.slice(9).map(r => ({
  ...r,
  logoUrl: r.logoUrl || r.imagenes?.[0] || 'assets/default-image.jpg',
  name: r.nombreRestaurante || 'Nombre no disponible'
}));

  });
}

verDetalle(restaurant: any) {
  this.router.navigate(['/restaurant-detail'], {
    queryParams: {
      data: JSON.stringify(restaurant)
    }
  });
}




}
