import { ListResponse } from '@/@types/list-response.type';
import { Tech } from '@/@types/tech.type';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TechsService {
  private httpClient = inject(HttpClient);

  getAllTechs(): Observable<ListResponse<Tech>> {
    return this.httpClient.get<ListResponse<Tech>>(
      `${environment.api_url}/techs`
    );
  }
}
