import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css',
})
export class PeliculasComponent implements OnInit {
  peliculas: any[] = [];
  pelicula: any;

  constructor(private _firestoreService: FirestoreService) {}

  async ngOnInit() {
    this.peliculas = await this._firestoreService.getAllDocument<any>(
      'peliculas'
    );
  }

  seleccionarPelicula(pelicula: any): void {
    this.pelicula = pelicula;
  }
}
