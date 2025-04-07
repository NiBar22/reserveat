import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonSearchbar, IonButton, IonIcon, IonChip, IonHeader, IonToolbar, IonButtons, IonCard, IonItem
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, imagesOutline, documentAttachOutline } from 'ionicons/icons';

@Component({
  selector: 'app-restaurant-uploads',
  templateUrl: './restaurant-uploads.page.html',
  styleUrls: ['./restaurant-uploads.page.scss'],
    imports: [IonContent, IonSearchbar, IonButton, IonIcon, IonChip, IonHeader, IonToolbar, IonButtons, IonCard, IonItem, IonIcon]
  
})
export class RestaurantUploadsPage {
  menuFiles: File[] = [];
  restaurantImages: File[] = [];

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, imagesOutline, documentAttachOutline });
  }

  uploadMenu() {
    this.showFilePicker('menu');
  }

  uploadImages() {
    this.showFilePicker('images');
  }

  showFilePicker(type: 'menu' | 'images') {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'menu' ? 'application/pdf' : 'image/*';
    input.multiple = type === 'images';

    input.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target.files) return;

      const files = Array.from(target.files) as File[]; 

      if (type === 'menu') {
        this.menuFiles = files;
      } else {
        this.restaurantImages = files;
      }
    });

    input.click();
  }

  canRegister() {
    return this.menuFiles.length > 0 && this.restaurantImages.length >= 8;
  }

  registerRestaurant() {
    console.log('Registro completado:', { menu: this.menuFiles, images: this.restaurantImages });
    this.router.navigate(['/home']);
  }

  goBack() {
    this.router.navigate(['/select-filters'], { queryParams: { userType: 'restaurant' } });
  }
}
