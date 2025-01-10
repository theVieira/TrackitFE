import { environment } from '@/../environments/environment.development';
import { AuthenticationService } from '@/services/authentication.service';
import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private formBuilder = inject(NonNullableFormBuilder);
  private toastService = inject(ToastrService);
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);

  protected form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(environment.token_name);

      if (token) this.authenticationService.redirectToHome();
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.form.invalid) return;
    const response = this.authenticationService.signIn(this.form.getRawValue());

    response.subscribe({
      next: ({ token }) => {
        localStorage.setItem(environment.token_name, token);
        this.toastService.success('Usuário autenticado com sucesso');
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
        switch (err.status) {
          case 401:
            this.toastService.error(
              'Verifique as credenciais e tente novamente',
              '401 - Não autorizado'
            );
            break;

          case 404:
            this.toastService.error('404 - Não encontrado');
            break;

          case 0:
            this.toastService.error('404 - Não encontrado');
            break;

          default:
            this.toastService.error('Ocorreu um erro inesperado');
            break;
        }
      },
    });
  }
}
