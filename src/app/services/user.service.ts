import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) {}

  addComensal(comensal: any) {
    const ref = collection(this.firestore, 'comensales');
    return addDoc(ref, comensal);
  }

  addRestaurante(restaurante: any) {
    const ref = collection(this.firestore, 'restaurantes');
    return addDoc(ref, restaurante);
  }
}
