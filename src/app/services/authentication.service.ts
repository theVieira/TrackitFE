import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@/../environments/environment.development';
import { Router } from '@angular/router';
import { Tech } from '@/@types/tech.type';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private httpClient = inject(HttpClient);
  private route = inject(Router);
  private storageService = inject(StorageService);

  signIn({ email, password }: ISignInRequest): Observable<ISignInResponse> {
    return this.httpClient.post<ISignInResponse>(
      environment.api_url + '/sign-in',
      {
        email,
        password,
      }
    );
  }

  signOut() {
    localStorage.clear();
    this.redirectToAuthentication();
    return;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(environment.token_name);
  }

  getTech(): Tech | null {
    const tech: Tech | null = this.storageService.getItem('tech');

    return tech;
  }

  getToken(): string | null {
    const token = this.storageService.getItem<string>(environment.token_name);

    return token;
  }

  redirectToAuthentication() {
    this.route.navigate(['sign-in']);
  }

  redirectToUnauthorized() {
    this.route.navigate(['unauthorized']);
  }

  redirectToHome() {
    this.route.navigate(['']);
  }
}

interface ISignInRequest {
  email: string;
  password: string;
}

interface ISignInResponse {
  token: string;
  tech: Tech;
}
