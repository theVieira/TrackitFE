import { inject, Injectable } from '@angular/core';
import { iSignInRequest } from '../api/sign-in.request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iSignInResponse } from '../api/sign-in.response';
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
