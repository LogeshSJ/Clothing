import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}
 
  getAllCart(): Observable<AppResponse> {
    let userId = 1;
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/cart/${userId}`);
  }

  deleteCart(): Observable<AppResponse> {
    let userId = 1;
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/cart/`);
  }
 
}
