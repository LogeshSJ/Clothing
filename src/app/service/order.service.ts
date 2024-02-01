import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  postOrder(data:any): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/order`,data);
  }

  getAllOrders(userId:number): Observable<AppResponse> {
    // let userId=1;
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/order/${userId}`);
  }
  
  // updateOrderStatus(orderId: number, statusId: number): Observable<AppResponse> {
  //   const data = { orderId, statusId };
  //   return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/admin/order/status`, data);
  // }
  
}
