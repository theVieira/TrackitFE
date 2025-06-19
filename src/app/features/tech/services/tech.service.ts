import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iTech } from '../models/tech.model';
import { environment } from '@environment';
import { iPaginatedResponse } from '@shared/api/paginated.response';

@Injectable({
  providedIn: 'root',
})
export class TechService {
  private readonly _httpClient = inject(HttpClient);

  public getAllTechs(): Observable<iPaginatedResponse<iTech>> {
    return this._httpClient.get<iPaginatedResponse<iTech>>(
      `${environment.apiUrl}/techs`
    );
  }

  public getTechByName(name: string): Observable<iTech | null> {
    return this._httpClient.get<iTech | null>(
      `${environment.apiUrl}/techs/${name}`
    );
  }
}
