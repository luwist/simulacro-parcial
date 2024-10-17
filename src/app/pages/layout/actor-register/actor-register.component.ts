import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { CommonModule } from '@angular/common';
import {
  NgbDatepickerModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { InputErrorComponent } from '../../../components';
import { CountryTableComponent } from '../../../components/country-table/country-table.component';
import { ToastService } from '../../../services/toast/toast.service';
import { ToastsContainer } from '../../../services/toast/toast-container.service';

@Component({
  selector: 'app-actor-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    FormsModule,
    InputErrorComponent,
    CountryTableComponent,

    NgbTooltipModule,
    ToastsContainer,
  ],
  templateUrl: './actor-register.component.html',
  styleUrl: './actor-register.component.css',
})
export class ActorRegisterComponent {
  errorText!: string;
  buttonText: string = 'Agregar actor';

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    identity: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  constructor(
    private _firestoreService: FirestoreService,
    private _toastService: ToastService
  ) {}

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  onCountrySelected(pais: any): void {
    this.form.patchValue({
      country: pais.name.common,
    });
  }

  async onRegister(template: TemplateRef<any>) {
    try {
      const data = this.form.getRawValue();

      this.form.markAsPending();
      this.buttonText = 'Cargando...';

      await this._firestoreService.addDocument('actors', {
        name: `${data.name} ${data.surname}`,
        identity: data.identity,
        age: data.age,
        country: data.country,
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
      this.buttonText = 'Agregar actor';
    }
  }
}
