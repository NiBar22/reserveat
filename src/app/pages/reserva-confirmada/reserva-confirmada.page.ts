import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-reserva-confirmada',
  templateUrl: './reserva-confirmada.page.html',
  styleUrls: ['./reserva-confirmada.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ReservaConfirmadaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
