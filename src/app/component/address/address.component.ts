import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address';
import { AppResponse } from 'src/app/model/appResponse';
import { UserDetail } from 'src/app/model/user-detail';
import { AddressService } from 'src/app/service/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  constructor(private router: Router, private addressService: AddressService) {}

  address: string = '';
  city: string = '';
  zipcode: string = '';
  // address(addressForm: NgForm) {}
  AddressName: string = '';
  INITIAL_ADDRESS: Address = { id: 0, address: '', city: '', zipcode:'',userId:0 };
  addressModel: Address = this.INITIAL_ADDRESS;
  emitterValue = false;
  addresses: Address[] = [];

  userDetails:UserDetail[]=[];

  onSubmit(addressForm:NgForm){}

  ngOnInit(): void {
    // let userId=3;
    // this.addressService.getAllAddress().subscribe({
    //   next: (response: AppResponse) => {
    //     if (response && response.data) {
    //       this.addresses = response.data?.addressList;
    //     } else {
    //       console.error('Invalid API response format:', response);
    //     }
    //   },
    //   error: (err) => {
    //     console.log('An error occurred:', err);
    //   },
    //   complete: () => console.log('There are no more actions happening.'),
    // });
    this.getAllAddress();
  }

  getAllAddress() {
    this.addressService.getAllAddress().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.addresses = response.data?.addressList;
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

  createAddress(addressForm: NgForm) {
    if(addressForm.valid){
      this.addressService
        .postAddress(this.addressModel)
        .subscribe({
          next: (response: AppResponse) => {
            if (response && response.data) {
              this.addresses = response.data.addressList;
              this.addressModel = {...this.INITIAL_ADDRESS};
              addressForm.resetForm();
              this.getAllAddress();
              // console.log(response.data);
            }
          },
          error: (err) => {
            console.error('An error occurred:', err);
          },
        });
    } else {
    console.log('Form is valid.Please check the entered details.');
    }
      this.addressService.putAddress(this.addressModel).subscribe({
        next: (response: any) => {
          this.addresses = response.data;
          this.addressModel=this.INITIAL_ADDRESS;
          this.getAllAddress();

          addressForm.resetForm();
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  
  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.addressService.deleteAddress(id).subscribe({
        next: (response: any) => {
          this.address=response.data;
          this.getAllAddress();
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }
}
