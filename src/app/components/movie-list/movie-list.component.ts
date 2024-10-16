import { Component, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  @Output() getMovieSelected = new EventEmitter();
  movies: any[] = [];

  constructor(private _firestoreService: FirestoreService) {}

  async ngOnInit() {
    this.movies = await this._firestoreService.getAllDocument<any>('peliculas');
  }

  onMovieSelected(movie: any): void {
    this.getMovieSelected.emit(movie);
  }
}
