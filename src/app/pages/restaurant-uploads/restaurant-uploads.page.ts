import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonSearchbar, IonButton, IonIcon, IonChip, IonHeader, IonToolbar, IonButtons, IonCard, IonItem
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, imagesOutline, documentAttachOutline } from 'ionicons/icons';
import { FileUploadService } from '../../services/file-upload.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-restaurant-uploads',
  templateUrl: './restaurant-uploads.page.html',
  styleUrls: ['./restaurant-uploads.page.scss'],
    imports: [CommonModule,IonContent, IonSearchbar, IonButton, IonIcon, IonChip, IonHeader, IonToolbar, IonButtons, IonCard, IonItem, IonIcon]
  
})
export class RestaurantUploadsPage {
  menuFiles: File[] = [];
  restaurantImages: File[] = [];

  constructor(public fileUploadService: FileUploadService,
    private userService: UserService,
    private router: Router) {
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

  async registerRestaurant() {
  try {
    const datosRestaurante = JSON.parse(localStorage.getItem('restauranteData') || '{}');

    // 1. Subir archivo del menú
    const menuURL = this.menuFiles.length > 0
      ? await this.fileUploadService.uploadFile(`menus/${datosRestaurante.usuario}_${this.menuFiles[0].name}`, this.menuFiles[0])
      : '';

    // 2. Subir imágenes
    const imageURLs = this.restaurantImages.length > 0
      ? await this.fileUploadService.uploadMultiple(`restaurantes/${datosRestaurante.usuario}`, this.restaurantImages)
      : [];

    // 3. Combinar todo
    const restauranteConArchivos = {
      ...datosRestaurante,
      menuURL, // ✅ definida arriba
      imagenes: imageURLs // ✅ definida arriba
    };

    // 4. Guardar en localStorage
    localStorage.setItem('restauranteConArchivos', JSON.stringify(restauranteConArchivos));
    this.router.navigate(['/select-filters'], 
      {
      queryParams: {
    userType: 'restaurant'
  }
});
  } catch (error) {
    console.error('Error al registrar restaurante con archivos:', error);
  }
}


  goBack() {
  localStorage.removeItem('restauranteData');
  localStorage.removeItem('restauranteConArchivos');
  this.router.navigate(['/register-restaurante'], { queryParams: { userType: 'restaurant' } });
}

}
