import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
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
  NgbDatepickerModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ActorTableComponent } from '../../../components/actor-table/actor-table.component';
import { ToastsContainer } from '../../../services/toast/toast-container.service';
import { ToastService } from '../../../services/toast/toast.service';
import { InputErrorComponent } from '../../../components';

@Component({
  selector: 'app-movie-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    FormsModule,
    ActorTableComponent,
    InputErrorComponent,

    NgbTooltipModule,
    ToastsContainer,
  ],
  templateUrl: './movie-register.component.html',
  styleUrl: './movie-register.component.css',
})
export class MovieRegisterComponent {
  actors: any[] = [];
  isLoading = true;
  countrySelected: any = null;
  currentFile: any;
  currentDate: any;

  buttonText: string = 'Dar de alta';
  errorText!: string;

  tipos = ['terror', 'comedias', 'amor', 'otros'];

  model: any;

  form = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    protagonist: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    amountPublic: new FormControl('', Validators.required),
    actor: new FormControl('', Validators.required),
  });

  constructor(
    private _firestoreService: FirestoreService,
    private _uploadService: UploadService,
    private _toastService: ToastService
  ) {}

  async ngOnInit(): Promise<void> {
    this.actors = await this._firestoreService.getAllDocument('actors');
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  onImageSelected(e: Event): void {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];

      this.currentFile = file;
    }
  }

  onDateSelect(date: any): void {
    this.currentDate = new Date(date.year, date.month, date.day);
  }

  onItemSelected(actor: any): void {
    this.form.patchValue({
      actor: `${actor.name}`,
    });
  }

  async onRegister(template: TemplateRef<any>) {
    try {
      this.form.markAsPending();
      this.buttonText = 'Cargando...';

      const data = this.form.getRawValue();
      const imageUrl = await this._uploadService.upload(this.currentFile);

      await this._firestoreService.addDocument('movies', {
        image: imageUrl,
        released: this.currentDate,
        ...data,
      });

      this.form.reset();

      this.errorText = 'Se ha dado de alta correctamente';

      this._toastService.show({
        template,
        classname: 'bg-success text-light',
        delay: 2000,
      });
    } catch (error) {
      this.errorText = 'Ha ocurrio un error. Intentelo de nuevo.';

      this._toastService.show({
        template,
        classname: 'bg-danger text-light',
        delay: 2000,
      });
    } finally {
      this.buttonText = 'Dar de alta';
    }
  }
}
