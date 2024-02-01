import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Cart } from 'src/app/model/cart';
import { Home } from 'src/app/model/home';
import { Order } from 'src/app/model/order';
import { UserDetail } from 'src/app/model/user-detail';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
// export class CartComponent implements OnInit {
//   // cartCloths: Cart[] = [];
//   // constructor(private cartService: CartService) {}

//   // ngOnInit(): void {
//   //   this.cartService.getAllCart().subscribe(
//   //     (response: AppResponse) => {
//   //       this.cartCloths = response.data;
//   //     },
//   //     (err) => {
//   //       console.error('An error occurred:', err);
//   //     }
//   //   );
//   // }

//     cartCloths: Cart[] = [];
//     error: string = '';
//     isCartEmpty: boolean = true;
//     INITIAL_CART: Cart = {
//       id: 0,
//       cloth: { title: '', price: 0, description: '' },
//       count: 1,
//     };
//     // cartModel: Cart = this.INITIAL_CART;
//     emitterValue = false;
//     constructor(
//       private cartService: CartService,
//       private orderService: OrderService,
//       private storageService: StorageService,
//       private router: Router
//     ) {}

//     ngOnInit(): void {

//       this.getAllCart();
//     }

// getAllCart() {
//   let user = this.storageService.getLoggedInUser();
//   this.cartService.getAllCart().subscribe(
//     (response: AppResponse) => {
//       this.cartCloths = response.data;
//     },
//     (err) => {
//       console.error('An error occurred:', err);
//     }
//   );
// }

//     // onSubmit(categoryForm: any) {
//     //   this.cartService
//     //     .postCart({

//     //     })
//     //     .subscribe({
//     //       next: (response: any) => {
//     //         if (response && response.data) {
//     //           if(response.status==200) {
//     //             this.getAllCart();
//     //           }
//     //           console.log(response.data);
//     //         }
//     //       },
//     //       error: (err) => {
//     //         console.error('An error occurred:', err);
//     //       },
//     //     });
//     // }

//     deleteCart(cart: Cart) {
//       if (cart.id !== undefined) {
//         this.cartService.deleteCart().subscribe({
//           next: (response: any) => {
//             this.cartCloths = response.data;
//           },
//           error: (err) => {
//             console.log(err?.error?.error?.message);
//           },
//         });
//       }
//     }

//     someValue: any;
//     productsForOrder: any[] = [];
//     cart: any = {
//       product: {} // Define your product object here
//     };

//     // handleCheckboxClick(event:any,product: any) {
//     //   console.log("productsss",product);

//     //   if (event.target.checked) {
//     //     this.productsForOrder.push(product);
//     //     this.cartService.handleCheckboxClick(product);
//     //     console.log("this.productsfororder : " , this.productsForOrder);

//     //     // this.router.navigate(['/address']);
//     //   } else {
//     //     for(let prod of this.productsForOrder) {
//     //       if(prod.id === product.id) {

//     //       }
//     //     }
//     //     this.productsForOrder = this.productsForOrder.filter(item => item.id !== product.id);
//     //       // this.productsForOrder = [];
//     //     // alert('Please check the checkbox to proceed.');
//     //   }
//     // }

//   }
export class CartComponent implements OnInit {
  error: string = '';
  cartCloths: Cart[] = [];
  currentOrder: Order | undefined;
  isCartEmpty: boolean = true;
  userDetails: UserDetail[] = [];
  clothId: string[] = [];
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router

  ) {}

  ngOnInit(): void {
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

  loadUserDetails() { 
    const userId = this.storageService.getLoggedInUser().id;
    this.userService.getUserDetails().subscribe(
      (response: AppResponse) => {
        if (response && response.data && Array.isArray(response.data)) {
          const userWithAddress = response.data.find(
            (user) => user.addressList && user.addressList.length > 0
          );
              console.log(response);
              
          if (userWithAddress) {
            const firstAddress = userWithAddress.addressList[0].id;
            console.log(firstAddress);

            const loggedInUser = this.storageService.getLoggedInUser();
            if (loggedInUser) {
              const order = {
                userId: loggedInUser.id,
                addressId: firstAddress,
              };

              this.orderService.postOrder(order).subscribe({
                next: (response: any) => {
                  this.currentOrder = response.data;
                  this.cartCloths = [];
                  this.isCartEmpty = true;
                },
                error: (err) => {
                  console.error('Checkout error:', err);
                },
              });
            }
          } else {
            console.error(
              'No user with a valid addressList found in the API response.'
            );
          }
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      (error) => {
        console.log('An error occurred:', error);
      }
    );
  }

  checkout() {
    console.log('got In');
    const loggedInUser = this.storageService.getLoggedInUser();

    if (loggedInUser) {
      this.loadUserDetails();
    } else {
      console.error('User not logged in.');
      console.log('nope');
    }

    
  }

  onDelete(
    event: Event,
    userId: number | undefined,
    clothId: number | undefined
  ) {
    event.preventDefault();
    userId = this.storageService.getLoggedInUser().id;
    if (userId !== undefined && clothId !== undefined) {
      this.cartService.deleteCart(userId, clothId).subscribe({
        next: (response: any) => {
          this.cartCloths = response.data;
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }
  goBack(): void {
    // You can define the route to navigate back to, for instance:
    this.router.navigate(['/']); // Change '/' to the desired route
  }
  getTotalItems(): number {
    return this.cartCloths.reduce((total, cart) => total + cart.count, 0);
  }
  getTotalPrice(): number {
    return this.cartCloths.reduce(
      (total, cart) => total + cart.cloth.price * cart.count,
      0
    );
  }
}
