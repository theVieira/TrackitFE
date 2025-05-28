import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '@shared/services/notification.service';
import { StorageService } from '@core/services/storage.service';
import { environment } from '@environment';
import { AuthenticationService } from '@features/authentication/services/authentication.service';
import { AuthenticationService as AuthenticationServiceCore } from '@core/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _authenticationService = inject(AuthenticationService);
  private readonly _storageService = inject(StorageService);
  private readonly _router = inject(Router);
  private readonly _notificationService = inject(NotificationService);
  private readonly _authenticationServiceCore = inject(
    AuthenticationServiceCore
  );

  protected form = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    const token = this._storageService.getItem<string>(
      environment.tokenCookieName
    );

    if (token) this._router.navigate(['']);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.form.invalid) return;
    const response = this._authenticationService.signIn(
      this.form.getRawValue()
    );

    response.subscribe({
      next: ({ token, tech }) => {
        this._storageService.setItem(environment.tokenCookieName, token);
        this._storageService.setItem(
          environment.techCookieName,
          JSON.stringify(tech)
        );
        this._notificationService.success('Usuário autenticado com sucesso');
        this._authenticationServiceCore.isAuthenticated.set(true);
        this._router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
        switch (err.status) {
          case 401:
            this._notificationService.error(
              'Verifique as credenciais e tente novamente',
              '401 - Não autorizado'
            );
            break;

          case 404:
            this._notificationService.error('404 - Não encontrado');
            break;

          case 0:
            this._notificationService.error('404 - Não encontrado');
            break;

          default:
            this._notificationService.error('Ocorreu um erro inesperado');
            break;
        }
      },
    });
  }
}
