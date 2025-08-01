import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
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

  direccionRestaurante: string = '';
  telefonoRestaurante: string = '';


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
      this.direccionRestaurante = navState['direccion'] || '';
      this.telefonoRestaurante = navState['telefono'] || '';
 
     }

    this.extraerDiasDisponibles();
  }

  extraerDiasDisponibles(): void {
    this.diasDisponibles = Object.keys(this.horarios).filter(
      dia => this.horarios[dia]?.abierto
    );
  }

  onFechaSeleccionada(event: any) {
  const fecha = new Date(event.detail.value);
  const diaSemana = fecha.toLocaleDateString('es-CO', { weekday: 'long' }).toLowerCase(); // ej: "lunes"

  const horarioDelDia = this.horarios?.[diaSemana];

  if (!horarioDelDia || !horarioDelDia.abierto) {
    this.horasDisponibles = [];
    return;
  }

  const desde = horarioDelDia.desde; 
  const hasta = horarioDelDia.hasta; 
  const bloque = 60 / (horarioDelDia.reservasPorHora || 1); 

  const [horaDesde, minutoDesde] = desde.split(':').map(Number);
  const [horaHasta, minutoHasta] = hasta.split(':').map(Number);

  const inicio = new Date(fecha);
  inicio.setHours(horaDesde, minutoDesde, 0, 0);

  const fin = new Date(fecha);
  fin.setHours(horaHasta, minutoHasta, 0, 0);

  const bloques: string[] = [];
  const actual = new Date(inicio);

  while (actual < fin) {
    const hora = actual.toTimeString().substring(0, 5);
    bloques.push(hora);
    actual.setMinutes(actual.getMinutes() + bloque);
  }

  this.horasDisponibles = bloques;
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

 async confirmarReserva(): Promise<void> {
  if (!this.fechaSeleccionada || !this.horaSeleccionada) {
    alert('Por favor selecciona una fecha y hora válidas antes de confirmar.');
    return;
  }

  const usuarioActivo = localStorage.getItem('usuarioActivo');
  if (!usuarioActivo) {
    alert('No se ha encontrado un usuario activo. Inicia sesión de nuevo.');
    this.router.navigate(['/login']);
    return;
  }

  const db = getFirestore();


  let usuarioFoto = '';
  const comensalesRef = collection(db, 'comensales');
  const q = query(comensalesRef, where('usuario', '==', usuarioActivo));

  try {
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const comensalDoc = snapshot.docs[0];
      usuarioFoto = comensalDoc.data()['fotoURL'] || '';
    }
  } catch (error) {
    console.warn('No se pudo obtener la foto del usuario desde Firestore:', error);
  }

  try {
    await addDoc(collection(db, 'reservas'), {
      usuario: usuarioActivo,
      usuarioFoto: usuarioFoto, 
      restauranteId: this.restauranteId,
      restauranteNombre: this.restauranteNombre,
      restauranteLogo: this.restauranteLogo,
      fecha: this.fechaSeleccionada,
      hora: this.horaSeleccionada,
      comensales: this.comensales,
      estado: 'activa',
      asistio: null,
      calificado: false,
      timestamp: new Date()
    });

    this.router.navigate(['/reserva-confirmada'], {
      state: {
        restauranteNombre: this.restauranteNombre,
        restauranteLogo: this.restauranteLogo,
        nombreUsuario: usuarioActivo,
        comensales: this.comensales,
        fecha: this.fechaSeleccionada,
        hora: this.horaSeleccionada,
        direccion: this.direccionRestaurante,
        telefono: this.telefonoRestaurante,
        usuarioFoto: usuarioFoto 
      }
    });

  } catch (error) {
    console.error('Error al guardar la reserva:', error);
    alert('Hubo un error al confirmar tu reserva. Intenta nuevamente.');
  }
}



}
