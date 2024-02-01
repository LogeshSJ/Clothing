import { Component, OnInit } from '@angular/core';
import { Cloth } from 'src/app/model/cloth';
import { Order } from 'src/app/model/order';
import { Orderstatus } from 'src/app/model/orderstatus';
import { AdminorderService } from 'src/app/service/adminorder.service';

@Component({
  selector: 'app-adminorder',
  templateUrl: './adminorder.component.html',
  styleUrls: ['./adminorder.component.css'],
})
export class AdminOrderComponent implements OnInit {
  orders: Order[] = [];
  userOrders: Order[] = [];
  orderStatusList: Orderstatus[] = [];
  status: Orderstatus[] = [];

  products: Cloth[] = [];

  userId: number | undefined;
  orderId: number | undefined;
  statusId: number | undefined;
  selectedOrder: Order | null = null;

  constructor(private adminOrderService: AdminorderService) {}

  ngOnInit(): void {}

  getAllOrders() {
    this.adminOrderService.getAllOrders().subscribe((response: any) => {
      this.userOrders = response.data;
      // console.log('order products', this.orders);
      // console.log(response.data+"sj");

    });
  }

  getUsersOrder() {
    if (this.userId !== undefined) {
      this.adminOrderService
        .getUsersOrder(this.userId)
        .subscribe((response: any) => {
          this.userOrders = response.data;
          
        });
    }
  }

  getAllOrderStatus() {
    this.adminOrderService.getAllOrderStatus().subscribe((response: any) => {
      this.orderStatusList = response.data;
    });
  }

  updateOrderStatus() {
    if (this.orderId !== undefined && this.statusId !== undefined) {
      const orderStatusRequest = {
        orderId: this.orderId,
        statusId: this.statusId,
      };

      this.adminOrderService
        .updateOrderStatus(orderStatusRequest)
        .subscribe((response: any) => {});
    }
  }

  selectUserOrder(order: Order): void {
    this.selectedOrder = order;
  }

  // getProductName(title: string):string {
  //   const product = this.products.find((p) => p.title === title);
  //   return product ? product.title : '';
  // }
}
