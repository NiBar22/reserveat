import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'todos',
    loadComponent: () => import('./todos/todos.page').then( m => m.TodosPage)
  },
  {
    path: 'video-juegos',
    loadComponent: () => import('./video-juegos/video-juegos.page').then( m => m.VideoJuegosPage)
  },
  {
    path: 'chat-bots',
    loadComponent: () => import('./chat-bots/chat-bots.page').then( m => m.ChatBotsPage)
  },
  {
    path: 'apps',
    loadComponent: () => import('./apps/apps.page').then( m => m.AppsPage)
  },
  {
    path: 'presentacion',
    loadComponent: () => import('./profe/presentacion/presentacion.page').then( m => m.PresentacionPage)
  },
];
