import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { Address } from '../model/address';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}
  getAllAddress(userId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `http://localhost:8080/api/user/userAddress/${userId}`
    );
  }

  postAddress(data: any): Observable<AppResponse> {
    console.log(data);
    
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/address`,
      data
    );
  }

  deleteAddress(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `http://localhost:8080/api/user/address/${id}`
    );
  }

  putAddress(address: Address): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      'http://localhost:8080/api/user/address',
      address
    );
  }
}
