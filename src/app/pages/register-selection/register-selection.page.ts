import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { restaurantOutline, bodyOutline} from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-register-selection',
  templateUrl: './register-selection.page.html',
  styleUrls: ['./register-selection.page.scss'],
  imports: [IonContent, IonButton, CommonModule, FormsModule, IonIcon],
})
export class RegisterSelectionPage {
  constructor(private router: Router) {
    addIcons({restaurantOutline, bodyOutline});
  }

  registerComensal() {
    this.router.navigate(['/register-comensal']);
  }

  registerRestaurante() {
    this.router.navigate(['/register-restaurante']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  
}
