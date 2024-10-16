import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { MovieListComponent } from '../../../components/movie-list/movie-list.component';
import { MovieDetailComponent } from '../../../components/movie-detail/movie-detail.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieListComponent, MovieDetailComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  movie: any;

  onMovieSelected(movie: any): void {
    this.movie = movie;
  }
}
