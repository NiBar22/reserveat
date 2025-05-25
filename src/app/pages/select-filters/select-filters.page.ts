import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonSearchbar, IonButton, IonIcon, IonChip, IonHeader, IonToolbar, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { UserService } from '../../services/user.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app-select-filters',
  templateUrl: './select-filters.page.html',
  styleUrls: ['./select-filters.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonSearchbar, IonButton, IonIcon, CommonModule, FormsModule, IonChip, IonHeader, IonToolbar, IonButtons]
})
export class SelectFiltersPage {
  userType: string = 'comensal'; // Valor por defecto
  searchQuery: string = '';
  filters: string[] = [
    'Fast food', 'Temático', 'Buffet', 'Gourmet', 'Fusión', 'Familiar',
    'De especialidad', 'De autor', 'Alto cocina', 'Vanguardia', 'Clásica',
    'Hamburguesas', 'Pizza', 'Italiano', 'Asiático', 'Peruano', 'Boliviano',
    'Hot dogs', 'Indú', 'Tailandés', 'Vegano', 'Tradicional', 'Casero', 'Mexicano'
  ];
  filteredFilters: string[] = [...this.filters];
  selectedFilters: string[] = [];
  maxFilters: number = 6;
  errorMensaje: string = '';


  constructor(public router: Router,
  private route: ActivatedRoute,
  private userService: UserService,
  private firestore: Firestore) {
    addIcons({ arrowBackOutline });

    // Detectar si el usuario es restaurante
    this.route.queryParams.subscribe(params => {
      this.userType = params['userType'] || 'comensal';
      this.maxFilters = this.userType === 'restaurant' ? 6 : 9;
    });
  }

  filterFilters() {
    this.filteredFilters = this.filters.filter(filter =>
      filter.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleFilter(filter: string) {
    if (this.selectedFilters.includes(filter)) {
      this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
    } else if (this.selectedFilters.length < this.maxFilters) {
      this.selectedFilters.push(filter);
    }
  }

  removeFilter(index: number) {
    this.selectedFilters.splice(index, 1);
  }

  get emptySlots() {
    return new Array(this.maxFilters - this.selectedFilters.length);
  }

  async finishRegistration() {
if (this.userType === 'comensal') {
  const comensalData = JSON.parse(localStorage.getItem('comensalData') || '{}');

  if (!comensalData || this.selectedFilters.length === 0) {
    this.errorMensaje = 'Faltan datos para completar el registro.';
    return;
  }

  const comensalFinal = {
    ...comensalData,
    filtros: this.selectedFilters
  };

  const colRef = collection(this.firestore, 'comensales');
  await addDoc(colRef, comensalFinal);

  localStorage.setItem('usuarioActivo', comensalFinal.usuario);
  localStorage.removeItem('comensalData');
  this.router.navigate(['/home-screen']);
  return;
}


  try {
    const datosBasicos = JSON.parse(localStorage.getItem('restauranteData') || '{}');
    const datosArchivos = JSON.parse(localStorage.getItem('restauranteConArchivos') || '{}');

    if (!datosBasicos || !datosArchivos || this.selectedFilters.length === 0) {
      this.errorMensaje = 'Faltan datos para completar el registro.';
      return;
    }

    const restauranteFinal = {
      ...datosBasicos,
      ...datosArchivos,
      filtros: this.selectedFilters
    };
    delete restauranteFinal.fotoLogo;


    const colRef = collection(this.firestore, 'restaurantes');
    await addDoc(colRef, restauranteFinal);

    // Limpiar temporales
    localStorage.removeItem('restauranteData');
    localStorage.removeItem('restauranteConArchivos');

    this.router.navigate(['/home-screen']);
  } catch (error) {
    console.error('Error al finalizar registro:', error);
    this.errorMensaje = 'Ocurrió un error al guardar los datos. Intenta de nuevo.';
  }
}




  goBack() {
    if (this.userType === 'restaurant') {
      this.router.navigate(['/restaurant-uploads']);
    } else {
      this.router.navigate(['/register-comensal']);
    }
  }
}
