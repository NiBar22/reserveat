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

  constructor(public router: Router,
  private route: ActivatedRoute,
  private userService: UserService) {
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

  finishRegistration() {
  if (this.userType === 'restaurant') {
    const restauranteConArchivos = JSON.parse(localStorage.getItem('restauranteConArchivos') || '{}');

    if (!restauranteConArchivos || Object.keys(restauranteConArchivos).length === 0) {
      console.error('No se encontró información del restaurante en localStorage');
      return;
    }

    const restauranteFinal = {
      ...restauranteConArchivos,
      filtros: this.selectedFilters
    };

    this.userService.addRestaurante(restauranteFinal)
      .then(() => {
        localStorage.removeItem('restauranteData');
        localStorage.removeItem('restauranteConArchivos');
        this.router.navigate(['/home-screen']);
      })
      .catch(error => {
        console.error('Error al guardar restaurante en Firestore:', error);
      });

  } else {
    const comensalData = JSON.parse(localStorage.getItem('comensalData') || '{}');

    if (!comensalData || Object.keys(comensalData).length === 0) {
      console.error('No se encontró información del comensal en localStorage');
      return;
    }

    const comensalFinal = {
      ...comensalData,
      filtros: this.selectedFilters
    };

    this.userService.addComensal(comensalFinal)
      .then(() => {
        localStorage.removeItem('comensalData');
        this.router.navigate(['/home-screen']);
      })
      .catch(error => {
        console.error('Error al guardar comensal en Firestore:', error);
      });
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
