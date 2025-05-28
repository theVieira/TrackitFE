import { inject, Injectable } from '@angular/core';
import { iSignInRequest } from '../interfaces/sign-in-request.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iSignInResponse } from '../interfaces/sign-in-response.interface';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _httpClient = inject(HttpClient);

  public signIn({
    email,
    password,
  }: iSignInRequest): Observable<iSignInResponse> {
    return this._httpClient.post<iSignInResponse>(
      `${environment.apiUrl}/sign-in`,
      {
        email,
        password,
      }
    );
  }
}
