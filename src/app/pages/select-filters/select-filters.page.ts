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
  userType: string = ''; 
  searchQuery: string = '';
  filters: string[] = [
    'Fast food', 'Temático', 'Buffet', 'Gourmet', 'Fusión', 'Familiar',
    'De especialidad', 'De autor', 'Alto cocina', 'Vanguardia', 'Clásica',
    'Hamburguesas', 'Pizza', 'Italiano', 'Asiático', 'Peruano', 'Boliviano',
    'Hot dogs', 'Indú', 'Tailandés', 'Vegano', 'Tradicional', 'Casero', 'Mexicano'
  ];
  filteredFilters: string[] = [...this.filters]; 
  selectedFilters: string[] = [];
  maxFilters: number = 6; // Predeterminado para restaurante

  constructor(public router: Router, private route: ActivatedRoute ) {
    addIcons({ arrowBackOutline });

    this.route.queryParams.subscribe(params => {
      this.userType = params['userType'] || 'comensal';
  
      this.maxFilters = this.userType === 'restaurant' ? 6 : 9;
    });
  }

  // Filtrar los campos
  filterFilters() {
    this.filteredFilters = this.filters.filter(filter =>
      filter.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Agregar o quitar un filtro seleccionado
  toggleFilter(filter: string) {
    if (this.selectedFilters.includes(filter)) {
      this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
    } else if (this.selectedFilters.length < this.maxFilters) {
      this.selectedFilters.push(filter);
    }
  }

  // Remover un filtro desde las casillas seleccionadas
  removeFilter(index: number) {
    this.selectedFilters.splice(index, 1);
  }

  // Generar casillas vacías según el límite
  get emptySlots() {
    return new Array(this.maxFilters - this.selectedFilters.length);
  }

  // Terminar registro y redirigir
  finishRegistration() {
    console.log('Filtros seleccionados:', this.selectedFilters);
  
    if (this.userType === 'restaurant') {
      this.router.navigate(['/select-rest-photos']); 
    } else {
      this.router.navigate(['/home-screen']); 
    }
  }

  // Regresar a la pantalla anterior
  goBack() {
    this.router.navigate(['/register-comensal']); 
  }

  
}
