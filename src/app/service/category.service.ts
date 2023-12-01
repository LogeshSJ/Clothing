import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getCategories(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      'http://localhost:8080/api/admin/category/all'
    );
  }

  postCategories(data:any): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      'http://localhost:8080/api/admin/category',data
    );
  }

  deleteCategories(id: any): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `http://localhost:8080/api/admin/category/${id}`,
    );
  }
  

  putCategories(data:any): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      'http://localhost:8080/api/admin/category',data
    );
  }
}



