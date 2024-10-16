import { CommonModule } from '@angular/common';
import { Component, OnDestroy, TemplateRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputErrorComponent } from '../../components';
import { ToastService } from '../../services/toast/toast.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from '../../services/toast/toast-container.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    InputErrorComponent,
    NgbTooltipModule,
    ToastsContainer,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  accounts: any[] = [
    {
      id: 1,
      email: 'administrador@administrador.com',
      password: '123456',
      role: 'administrador',
    },
    {
      id: 2,
      email: 'empleado@empleado.com',
      password: '123456',
      role: 'empleado',
    },
  ];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  accountSelected: any;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastService: ToastService
  ) {}

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSelect(account: any): void {
    this.accountSelected = account;

    this.loginForm.patchValue({
      email: account.email,
      password: account.password,
    });
  }

  onLogin(template: TemplateRef<any>): void {
    const credentials = this.loginForm.getRawValue();

    this.loginForm.markAsPending();

    if (
      this.accountSelected.email == credentials.email &&
      this.accountSelected.password == credentials.password
    ) {
      this._authService.login(this.accountSelected);

      this._router.navigateByUrl('/');
    } else {
      this._toastService.show({
        template,
        classname: 'bg-danger text-light',
        delay: 2000,
      });
    }
  }

  ngOnDestroy(): void {
    this._toastService.clear();
  }
}
