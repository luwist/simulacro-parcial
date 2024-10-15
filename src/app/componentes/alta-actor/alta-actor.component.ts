import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { UploadService } from '../../services/upload/upload.service';

@Component({
  selector: 'app-alta-actor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alta-actor.component.html',
  styleUrl: './alta-actor.component.css',
})
export class AltaActorComponent implements OnInit {
  paises$!: Observable<any>;
  isLoading = true;

  tipos = ['terror', 'comedias', 'amor', 'otros'];

  form = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    fechaEstreno: new FormControl('', Validators.required),
    protagonista: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    cantidadPublico: new FormControl('', Validators.required),
    fotoPelicula: new FormControl('', Validators.required),
  });

  constructor(
    private _httpClient: HttpClient,
    private _firestoreService: FirestoreService,
    private _uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.paises$ = this._httpClient.get(
      'https://restcountries.com/v3.1/region/South%20America'
    );
  }

  async onSubirImagen(e: Event) {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];

      const imageUrl = await this._uploadService.upload(file);

      this.isLoading = false;

      this.form.patchValue({
        fotoPelicula: imageUrl,
      });
    }
  }

  async onAgregarActor() {
    await this._firestoreService.addDocument('peliculas', this.form.value);
  }
}
