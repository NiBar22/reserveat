import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'todos',
        loadComponent: () =>
          import('../todos/todos.page').then((m) => m.TodosPage),
      },
      {
        path: 'videoJuegos',
        loadComponent: () =>
          import('../video-juegos/video-juegos.page').then((m) => m.VideoJuegosPage),
      },
      {
        path: 'chat-bots',
        loadComponent: () =>
          import('../chat-bots/chat-bots.page').then((m) => m.ChatBotsPage),
      },
      {
        path: 'apps',
        loadComponent: () =>
          import('../apps/apps.page').then((m) => m.AppsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/todos',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/todos',
    pathMatch: 'full',
  },
];
