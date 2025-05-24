import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {
  IonItem,
  IonLabel,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonInput
} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: true,
      imports: [
    CommonModule,
    FormsModule,
    IonicModule 
  ],

})
export class ReservaPage implements OnInit {

  public restauranteId: string = '';
  public restauranteNombre: string = '';
  public restauranteLogo: string = '';

  public fechaSeleccionada: string = '';
  public horaSeleccionada: string = '';
  public comensales: number = 1;

  public diasDisponibles: string[] = [];
  public horarios: any = {};

  public today: string = new Date().toISOString().split('T')[0];

  public horasDisponibles: string[] = [];

  constructor(private route: ActivatedRoute,
    public router: Router) {addIcons({arrowBackOutline});}

  ngOnInit(): void {
    const navState = this.router.getCurrentNavigation()?.extras?.state;
    if (navState) {
      this.restauranteId = navState['id'];
      this.restauranteNombre = navState['nombre'];
      this.restauranteLogo = navState['logoUrl'];
      this.horarios = navState['horarios'] || {};
    }

    this.extraerDiasDisponibles();
  }

  extraerDiasDisponibles(): void {
    this.diasDisponibles = Object.keys(this.horarios).filter(
      dia => this.horarios[dia]?.abierto
    );
  }

  onFechaSeleccionada(event: any): void {
  this.fechaSeleccionada = event.detail.value;

  const date = new Date(this.fechaSeleccionada);
  const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const diaNombre = dias[date.getDay()];
  const configDia = this.horarios[diaNombre];

  if (configDia?.abierto) {
    const desde = configDia.desde;
    const hasta = configDia.hasta;
    const paso = this.horarios?.bloqueTiempoMin || 60;

    this.horasDisponibles = this.generarIntervalosHoras(desde, hasta, paso);
  } else {
    this.horasDisponibles = [];
    this.fechaSeleccionada = '';
    alert(`El restaurante no recibe reservas los días ${diaNombre}. Por favor selecciona otra fecha.`);
  }
}


  generarIntervalosHoras(desde: string, hasta: string, paso: number): string[] {
    const resultado: string[] = [];

    const [hInicio, mInicio] = desde.split(':').map(Number);
    const [hFin, mFin] = hasta.split(':').map(Number);

    let inicio = hInicio * 60 + mInicio;
    const fin = hFin * 60 + mFin;

    while (inicio + paso <= fin) {
      const horas = Math.floor(inicio / 60).toString().padStart(2, '0');
      const minutos = (inicio % 60).toString().padStart(2, '0');
      resultado.push(`${horas}:${minutos}`);
      inicio += paso;
    }

    return resultado;
  }

  goBack(): void {
    this.router.navigate(['/restaurant-detail'], { state: { id: this.restauranteId } });
  }

  aumentar(): void {
    this.comensales++;
  }

  disminuir(): void {
    if (this.comensales > 1) this.comensales--;
  }

  confirmarReserva(): void {
  if (!this.fechaSeleccionada || !this.horaSeleccionada) {
    alert('Por favor selecciona una fecha y hora válidas antes de confirmar.');
    return;
  }

  console.log('Reservando:', {
    restauranteId: this.restauranteId,
    fecha: this.fechaSeleccionada,
    hora: this.horaSeleccionada,
    comensales: this.comensales
  });

  // TODO: Lógica para guardar en Firebase
}

}
