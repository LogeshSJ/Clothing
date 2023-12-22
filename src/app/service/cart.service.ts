import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Home } from '../model/home';
import { Cart } from '../model/cart';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartModel: any;
  //         postCartResponse = response.data;
  //         this.postCartResponse.push(postCartResponse);
  //         console.log('response post: ', response);
  //         if (response && response.data) {
  //           if (response.status == 200) {
  //             this.getAllCart();
  //           }
  //           console.log(response.data);
  //         }
  //       },
  //       error: (err) => {
  //         console.error('An error occurred:', err);
  //       },
  //     });
  //     console.log('postCartResponse', postCartResponse);
  //   }
  // }
  addTocart(id: number) {
    throw new Error('Method not implemented.');
  }
  cartItems: Home[] = [];
  // INITIAL_CART: Cart = {
  //   userId: 0,
  //   id: 0,
  //   productId: 0,
  //   count: 1,
  // };
  // cartModel = this.INITIAL_CART;
  postCartResponse: any = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getAllCart(): Observable<AppResponse> {
    let userId = this.storageService.getLoggedInUser().id;
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/cart/${userId}`);
  }

  deleteCart(): Observable<AppResponse> {
    let userId = 1;
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/cart/`);
  }
  // postCart(cart: Cart): Observable<AppResponse> {
  //   return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/cart`, cart);
  // }
  // postCartJson(productId: number) {
  //   console.log('postCartJson', productId);
  //   let postCartResponse;
  //   let user = this.storageService.getLoggedInUser();
  //   this.postCart({
  //     userId: user.id,
  //     clothId: productId,
  //     count: this.cartModel.count,

  //   }).subscribe({
  //     next: (response: any) => {
  //       console.log('response : ', response);
  //       postCartResponse = response.data;
  //       this.postCartResponse.push(postCartResponse);
  //       console.log('response post: ', response);
  //       if (response && response.data) {
  //         if (response.status == 200) {
  //           this.getAllCart();
  //         }
  //         console.log(response.data);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('An error occurred:', err);
  //     },
  //   });
  //   console.log('postCartResponse', postCartResponse);
  // }
  addToCart(cloth: any):Observable<AppResponse>{
    console.log(cloth.id);
    let clothid:string = cloth.id;
    let userid = this.storageService.getLoggedInUser().id;
    console.log(userid);
    let send: any = {
      userId: userid,
      clothId: clothid,
    };
    console.log(send);

    // this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/cart`, send);
      return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/cart`,
      send
    );
  }
}
