import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonSearchbar, IonButton, IonIcon, IonChip, IonHeader, IonToolbar, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-select-filters',
  templateUrl: './select-filters.page.html',
  styleUrls: ['./select-filters.page.scss'],
  standalone: true,
  imports: [IonContent, IonSearchbar, IonButton, IonIcon, CommonModule, FormsModule, IonChip, IonHeader, IonToolbar, IonButtons]
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

  constructor(private router: Router, private route: ActivatedRoute) {
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
    console.log('Filtros seleccionados:', this.selectedFilters);

    if (this.userType === 'restaurant') {
      this.router.navigate(['/restaurant-uploads'], { queryParams: { userType: 'restaurant' } });
    } else {
      this.router.navigate(['/home-screen']);
    }
  }

  goBack() {
    if (this.userType === 'restaurant') {
      this.router.navigate(['/register-restaurant']);
    } else {
      this.router.navigate(['/register-comensal']);
    }
  }
}
