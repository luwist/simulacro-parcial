import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./componentes/bienvenida/bienvenida.component').then(
  //       (m) => m.BienvenidaComponent
  //     ),
  // },
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./componentes/login/login.component').then(
  //       (m) => m.LoginComponent
  //     ),
  // },
  // {
  //   path: 'peliculas',
  //   loadComponent: () =>
  //     import('./componentes/peliculas/peliculas.component').then(
  //       (m) => m.PeliculasComponent
  //     ),
  // },
  // {
  //   path: 'alta-actor',
  //   loadComponent: () =>
  //     import('./componentes/alta-actor/alta-actor.component').then(
  //       (m) => m.AltaActorComponent
  //     ),
  // },
];
