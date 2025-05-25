import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },

  {
    path: 'loader',
    loadComponent: () => import('./pages/loader/loader.page').then( m => m.LoaderPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register-selection',
    loadComponent: () => import('./pages/register-selection/register-selection.page').then( m => m.RegisterSelectionPage)
  },
  {
    path: 'register-comensal',
    loadComponent: () => import('./pages/register-comensal/register-comensal.page').then( m => m.RegisterComensalPage)
  },
  {
    path: 'register-comensal',
    loadComponent: () => import('./pages/register-comensal/register-comensal.page').then(m => m.RegisterComensalPage)
  },
  {
    path: 'register-restaurante',
    loadComponent: () => import('./pages/register-restaurante/register-restaurante.page').then( m => m.RegisterRestaurantePage)
  },
  {
    path: 'select-filters',
    loadComponent: () => import('./pages/select-filters/select-filters.page').then( m => m.SelectFiltersPage)
  },
  {
    path: 'home-screen',
    loadComponent: () => import('./pages/home-screen/home-screen.page').then( m => m.HomeScreenPage)
  },
  {
    path: 'restaurant-uploads',
    loadComponent: () => import('./pages/restaurant-uploads/restaurant-uploads.page').then( m => m.RestaurantUploadsPage)
  },  {
    path: 'register-horarios',
    loadComponent: () => import('./pages/register-horarios/register-horarios.page').then( m => m.RegisterHorariosPage)
  },
  {
    path: 'restaurant-detail',
    loadComponent: () => import('./pages/restaurant-detail/restaurant-detail.page').then( m => m.RestaurantDetailPage)
  },
  {
    path: 'reserva',
    loadComponent: () => import('./pages/reserva/reserva.page').then( m => m.ReservaPage)
  },
  {
    path: 'reserva-confirmada',
    loadComponent: () => import('./pages/reserva-confirmada/reserva-confirmada.page').then( m => m.ReservaConfirmadaPage)
  },
  {
    path: 'mis-reservas',
    loadComponent: () => import('./pages/mis-reservas/mis-reservas.page').then( m => m.MisReservasPage)
  },
  {
    path: 'review',
    loadComponent: () => import('./pages/review/review.page').then( m => m.ReviewPage)
  },

  
];
