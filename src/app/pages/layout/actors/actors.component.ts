import { Component } from '@angular/core';
import { ActorListComponent } from '../../../components/actor-list/actor-list.component';
import { CountryDetailComponent } from '../../../components/country-detail/country-detail.component';
import { ActorDetailComponent } from '../../../components/actor-detail/actor-detail.component';
import { MovieActorComponent } from '../../../components/movie-actor/movie-actor.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../services/firestore/firestore.service';

@Component({
  selector: 'app-actors',
  standalone: true,
  imports: [
    ActorListComponent,
    ActorDetailComponent,
    CountryDetailComponent,
    MovieActorComponent,
  ],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.css',
})
export class ActorsComponent {
  actor: any;
  country$!: Observable<any>;
  movieActor: any[] = [];

  constructor(
    private _httpClient: HttpClient,
    private _firestoreService: FirestoreService
  ) {}

  onActorSelected(actor: any): void {
    this.actor = actor;
    this.country$ = this._httpClient.get(
      `https://restcountries.com/v3.1/name/${actor.country}`
    );

    this.getAllMoviesByActor(actor.name);
  }

  async getAllMoviesByActor(name: string) {
    const movies = await this._firestoreService.getAllDocument('movies');

    this.movieActor = movies.filter((movie: any) => movie.actor == name);
  }
}
