import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  constructor(private orderService: OrderService) {}
 
  orderItems: Order[] = [];
  INITIAL_ORDER = {
    id: 0,
    ptoduct: { id: 0, title: '', price: 0 },
    address: { id: 0, address: '', city: '', zipcode: 0 },
  };
  orderModel = this.INITIAL_ORDER;
 
  ngOnInit(): void {
    this.getAllOrders();
  }
 
  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
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
          this.getAllOrders();
          // console.log(response.data, 'asasas');
        }
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
    });
  }
}
