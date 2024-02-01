import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { UserhomeService } from 'src/app/service/userhome.service';
import { AppResponse } from 'src/app/model/appResponse';
import { Home } from 'src/app/model/home';
import { CartService } from 'src/app/service/cart.service';
import { StorageService } from 'src/app/service/storage.service';
import { Cart } from 'src/app/model/cart';
import { AuthService } from 'src/app/service/auth.service';
import { Cloth } from 'src/app/model/cloth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private userhomeService: UserhomeService,
    private cartService: CartService,
    private storageService: StorageService,
    private authService: AuthService
  ) {}
  homeName: string = '';
  homes: Home[] = [];
  fliteredCloths: Home[] = [];
  searchQuery: string = '';
  // postCart(id: number) {}
  totalProducts: Cloth[] = [];
  userProducts: Cloth[] = [];
  search: string = '';

  ngOnInit(): void {
    this.userhomeService.getuserhome().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.homes = response.data;
          this.totalProducts = response.data;
          this.fliteredCloths=response.data
          console.log(this.homes);
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
  addToCart(cart: Home) {
    // console.log('postcart : ', cart.id);
    this.cartService.addToCart(cart).subscribe({
      next: (r) => {},
    });

    //   if (cart.id !== undefined) {
    //     this.cartService.postCartJson(cart.id);
    //   } else {
    //     console.log('productId error : ', cart.id);
    //   }
    // }
  }
  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  getLoggedInUserName(): String {
    return this.authService.getLoggedInUser()?.username || 'Guest';
  }
  // onSearch() {
  //     if (this.searchQuery.trim() !== '') {
  //     this.fliteredCloths=this.homes.filter((home)=>
  //     home.title.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     );

  //   }
  //   else{

  //     this.fliteredCloths = this.homes;
  //     this.ngOnInit();
  //   }

  //   this.userProducts = this.totalProducts.filter((cloth: Cloth) => {
  //     return cloth.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
  //   });
  // }

  onSearch() {
   
      this.fliteredCloths = this.homes.filter((home) =>
        home.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    
  }

  // filterArray() {
  //   this.products = this.originalProducts.filter((e: any) => {
  //     return e.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
  //   });
  // }

  // Sort products in ascending order (low to high)
  sortProductsLowToHigh() {
    if (this.fliteredCloths.length > 0) {
      this.fliteredCloths.sort((a, b) => a.price - b.price);
    }
  }
  
  sortProductsHighToLow() {
    if (this.fliteredCloths.length > 0) {
      this.fliteredCloths.sort((a, b) => b.price - a.price);
    }
  }
  
}
