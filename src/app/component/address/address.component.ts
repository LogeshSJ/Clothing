import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { NgForm } from '@angular/forms';
import { zip } from 'rxjs';
import { Address } from 'src/app/model/address';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { UserDetail } from 'src/app/model/user-detail';
import { AddressService } from 'src/app/service/address.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/order.json',
  };
  addressForm: any;

  constructor(
    private router: Router,
    private addressService: AddressService,
    private storageService: StorageService,
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  showAnimation: boolean = false;
  name: string = '';
  address: string = '';
  city: string = '';
  zipcode: string = '';
  phoneNumber: number = 0;
  AddressName: string = '';
  emitterValue = false;
  addresses: Address[] = [];
  addressid: number = 0;

  userDetails: UserDetail[] = [];

  INITIAL_ADDRESS: Address = {
    id: 0,
    name: '',
    address: '',
    city: '',
    zipcode: '',
    userId: 0,
    phoneNumber: 0,
  };
  isCartEmpty: boolean = true;
  cartCloths: Cart[] = [];
  addressModel: Address = this.INITIAL_ADDRESS;
  error: string = '';
  selectedAddress: Address | undefined;
  loggedInUserId: number = this.storageService.getLoggedInUser().id;

  onSubmit(addressForm: NgForm) {}

  ngOnInit(): void {
    let userId: number = this.storageService.getLoggedInUser().id;
    this.getAllAddress(userId);
    this.loadCart();
  }

  loadCart() {
    this.cartService.getAllCart().subscribe({
      next: (response: any) => {
        this.cartCloths = response.data;
        console.log(response.data);

        // console.log(this.cartCloths);

        this.isCartEmpty = this.cartCloths.length === 0;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  getAllAddress(userId: number) {
    this.addressService.getAllAddress(userId).subscribe({
      next: (response: AppResponse) => {
        console.log(response.data);

        if (response && response.data) {
          this.addresses = response.data;
          console.log(response.data);
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }

  createAddress() {
    let user: AppUser = this.storageService.getLoggedInUser();
    let address: any = {
      userId: user.id,
      name: this.name,
      address: this.address,
      city: this.city,
      phoneNumber: this.phoneNumber,
      zipcode: this.zipcode,
    };
    console.log(address);

    this.addressService.postAddress(address).subscribe({
      next: (response: AppResponse) => {
        this.ngOnInit();
        this.name = '';
        this.address = '';
        this.city = '';
        this.phoneNumber = 0;
        this.zipcode = '';
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
    });
  }

  onDelete(id: number | undefined) {
    console.log(id);

    if (id !== undefined) {
      this.addressService.deleteAddress(id).subscribe({
        next: (response: AppResponse) => {
          this.addresses = response.data;
          this.ngOnInit();
          console.log(response.data);
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }

  // postAddress(){}
  // onAddressSelection(){}
  placeOrder() {
    let userId: number = this.storageService.getLoggedInUser().id;
    let order: any = {
      userId: userId,
      addressId: this.addressid,
    };
    console.log(order);

    // Call the order service to place the order
    this.orderService.postOrder(order).subscribe({
      next: (response: AppResponse) => {
        this.addresses = response.data;
        this.ngOnInit();
        console.log('Order placed successfully:', response.data);
        // You can add any additional logic or navigation here
      },
      error: (err) => {
        console.error('Error placing order:', err?.error?.error?.message);
      },
    });

    this.showAnimation = true;

    setTimeout(() => {
      this.showAnimation = false;
    }, 2000);
  }

  checkout() {
    if (this.loggedInUserId && this.selectedAddress) {
      const order = {
        userId: this.loggedInUserId,
        addressId: this.selectedAddress.id,
      };
      console.log(order);

      //     this.orderService.postOrder(order).subscribe({
      //       next: (response: any) => {
      //         // Handle the response if needed
      //         console.log('Order created:', response);
      //       },
      //       error: (err) => {
      //         console.error('Error creating order:', err);
      //       },
      //     });
      //   } else {
      //     console.error('User ID or address is not selected.');
      //   }
      // }
    }
  }
}
