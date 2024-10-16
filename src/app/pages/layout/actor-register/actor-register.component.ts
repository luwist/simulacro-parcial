import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { UploadService } from '../../../services/upload/upload.service';
import { CommonModule } from '@angular/common';
import {
  NgbCalendar,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-actor-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    FormsModule,
  ],
  templateUrl: './actor-register.component.html',
  styleUrl: './actor-register.component.css',
})
export class ActorRegisterComponent {
  paises$!: Observable<any>;
  isLoading = true;

  tipos = ['terror', 'comedias', 'amor', 'otros'];

  model: any;

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
