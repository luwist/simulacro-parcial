import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'peliculas',
    loadComponent: () =>
      import('./componentes/peliculas/peliculas.component').then(
        (m) => m.PeliculasComponent
      ),
  },
  {
    path: 'alta-actor',
    loadComponent: () =>
      import('./componentes/alta-actor/alta-actor.component').then(
        (m) => m.AltaActorComponent
      ),
  },
];
