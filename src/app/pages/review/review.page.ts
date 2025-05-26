import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
      IonicModule 
    ],
})
export class ReviewPage implements OnInit {

  public reserva: any;
  public atencion: number = 0;
  public menu: number = 0;
  public espera: number = 0;
  public comentario: string = '';
  

  constructor(public router: Router,
    private route: ActivatedRoute,
    private firestore: Firestore) { }

   ngOnInit() {
    const nav = history.state;
    if (nav && nav.reserva) {
      this.reserva = nav.reserva;
      console.log("Reserva recibida:", this.reserva);  
    } else {
      this.router.navigate(['/mis-reservas']);
    }
  }

  setRating(tipo: string, valor: number) {
    switch (tipo) {
      case 'atencion': this.atencion = valor; break;
      case 'menu': this.menu = valor; break;
      case 'espera': this.espera = valor; break;
    }
  }

  async enviarReview() {
    const suma = Number(this.menu) + Number(this.atencion) + Number(this.espera);
    const promedio = Math.round(suma / 3);

    const reviewData = {
  restauranteId: this.reserva.restauranteId,
  restauranteNombre: this.reserva.restauranteNombre,
  restauranteLogo: this.reserva.restauranteLogo,
  comensalId: this.reserva.usuario,
  usuarioFoto: this.reserva.usuarioFoto || '',
  nombreComensal: this.reserva.usuario,
  comentario: this.comentario,
  menu: this.menu,
  atencion: this.atencion,
  espera: this.espera,
  promedio: promedio,
  fecha: new Date().toISOString()
};


    try {
  
      const reviewsRef = collection(this.firestore, 'reviews');
      await addDoc(reviewsRef, reviewData);
      const reservaRef = doc(this.firestore, 'reservas', this.reserva.id);
      await updateDoc(reservaRef, {
                calificado: true,
                promedio: promedio 
      });

      this.router.navigate(['/mis-reservas']);

    } catch (error) {
      console.error('❌ Error al enviar reseña:', error);
    }
  }

  goBack() {
    this.router.navigate(['/mis-reservas']);
  }

}
