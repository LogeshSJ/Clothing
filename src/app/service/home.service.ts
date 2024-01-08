import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';
import { Cloth } from '../model/cloth';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  error: String = '';
  constructor(private http: HttpClient) {}

  getAllCloth(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/cloth/all`
    );
  }

  postCloth(cloth: FormData): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/cloth/create`,
      cloth
    );
  }

  putCloth(cloth: Cloth): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/cloth`,
      cloth
    );
  }

  deleteCloth(id:number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/admin/cloth/${id}`);
  }
}
