import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'peliculas',
        loadComponent: () =>
          import('./movies/movies.component').then((m) => m.MoviesComponent),
      },
      {
        path: 'alta-actor',
        loadComponent: () =>
          import('./actor-register/actor-register.component').then(
            (m) => m.ActorRegisterComponent
          ),
      },
      {
        path: 'alta-pelicula',
        loadComponent: () =>
          import('./movie-register/movie-register.component').then(
            (m) => m.MovieRegisterComponent
          ),
      },
      {
        path: 'actores',
        loadComponent: () =>
          import('./actors/actors.component').then((m) => m.ActorsComponent),
      },
    ],
  },
];
