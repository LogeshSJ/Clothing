import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  constructor(private orderService: OrderService,private storageService:StorageService) {}
 
  orderItems: Order[] = [];
  INITIAL_ORDER = {
    id: 0,
    cloth: { id: 0, title: '', price: 0 },
    // address: { id: 0, address: '', city: '', zipcode: 0 },
  };
  orderModel = this.INITIAL_ORDER;
 
  ngOnInit(): void {
    let userId: any = this.storageService.getLoggedInUser().id;
    this.getAllOrders(userId);
  }
 
  getAllOrders(userId:number) {
    this.orderService.getAllOrders(userId).subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.orderItems = response.data;
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err: any) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }
 
  createOrder() {
    console.log('dasda');
 
    this.orderService.postOrder(this.orderModel).subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.orderItems = response.data;
          this.orderModel = { ...this.INITIAL_ORDER };
          let userId: any = this.storageService.getLoggedInUser().id;
          this.getAllOrders(userId);
          // console.log(response.data, 'asasas');
        }
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
    });
  }
}
