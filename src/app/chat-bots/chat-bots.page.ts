import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-chat-bots',
  templateUrl: './chat-bots.page.html',
  styleUrls: ['./chat-bots.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ChatBotsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
