import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}
  getAllAddress(): Observable<AppResponse> {
    let userId = 3;

    return this.http.get<AppResponse>(
      'http://localhost:8080/api/user/${userId}'
    );
  }

  postAddress(data: any): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      'http://localhost:8080/api/user/address',
      data
    );
  }

  deleteAddress(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      'http://localhost:8080/api/user/address/${id}'
    );
  }

  putAddress(address: Address): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      'http://localhost:8080/api/user/address',
      address
    );
  }
}
