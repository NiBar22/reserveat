import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-select-rest-photos',
  templateUrl: './select-rest-photos.page.html',
  styleUrls: ['./select-rest-photos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SelectRestPhotosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
