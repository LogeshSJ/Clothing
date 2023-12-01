import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { Cloth } from 'src/app/model/cloth';
import { Home } from 'src/app/model/home';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  //   homeName:string="";
  // INITIAL_HOME: Home = { id: 2, title: '',description:'',count:2,price:2000 };
  // homes: Home[] = [];
  //   homeModel: Home = this.INITIAL_HOME;
  //   constructor(private homeservice:HomeService){}

  // ngOnInit(): void {
  //   this.homeservice.gethome().subscribe({
  //     next: (response: AppResponse) => {

  //       if (response && response.data) {
  //         this.homes = response.data;
  //       } else {
  //         console.error('Invalid API response format:', response);

  //       }
  //     },
  //     error: (err) => {
  //       console.log('An error occurred:', err);

  //     },
  //     complete: () => console.log('There are no more actions happening.'),
  //   });
  // }

  constructor(private homeService: HomeService) {}
  error: string = '';
  cloths: Cloth[] = [];
  title: string = '';
  description: string = '';
  price: number = 0;
  id: number = 0;
  editState: number = 0;
  buttontxt: string = 'Add';
  file = '';

  // title: string = '';
  // price: string = '';
  // description: string = '';
  // Photo: string = '';
  // CatId: string = '';
  // addProducts(productForm: NgForm) {}
  // INITIAL_CLOTH: Cloth = {
  //   id: 0,
  //   title: '',
  //   description: '',
  //   price: 0,
  //   category_id:0,
  //   count:0

  // };
  // clothModel: Cloth = this.INITIAL_CLOTH;
  // emitterValue = false;
  // cloths: Cloth[] = [];
  // categories: Category[] = [];

  ngOnInit(): void {
    this.homeService.getAllCloth().subscribe({
      next: (response: any) => {
        this.cloths = response.data;
      },
    });
  }
  // getAllCloth() {
  //   this.homeService.getAllCloth().subscribe({
  //     next: (response: AppResponse) => {
  //       if (response && response.data) {
  //         this.cloths = response.data;
  //         // console.log('responsedata');
  //       } else {
  //         console.error('Invalid API response format:', response);
  //       }
  //     },
  //     error: (err: any) => {
  //       console.log('An error occurred:', err);
  //     },
  //     complete: () => console.log('There are no more actions happening.'),
  //   });
  // }

  onSubmit(clothForm: NgForm) {
    console.log('going in');

    // const id = clothForm.value.id;
    const description = clothForm.value.description;
    const price = clothForm.value.price;
    const title = clothForm.value.title;
    const category_id = clothForm.value.categoryId;
    let cloth: Cloth = {
      description: description,
      price: price,
      title: title,
      category_id: category_id,
    };

    // if (id === 0) {
      console.log(cloth.id);

      this.homeService.postCloth(cloth).subscribe({
        next: (response: any) => {
          this.cloths = response.data;
          clothForm.resetForm();
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
      // } else {
      //   this.homeService.putCloth(cloth).subscribe({
      //     next: (response: any) => {
      //       this.categories = response.data;
      //       clothForm.resetForm();
      //     },
      //     error: (err) => {
      //       console.log(err?.error?.error?.message);
      //     },
      //   });
      // }
    // }

    // onDelete(id: number | undefined) {
    //   if (id !== undefined) {
    //     this.homeService.deleteCloth(id).subscribe({
    //       next: (response: any) => {
    //         this.cloths = response.data;
    //       },
    //       error: (err) => {
    //         console.log(err?.error?.error?.message);
    //       },
    //     });
    //   }
    // onSubmit(form: NgForm): void {
    //   if (form.valid) {
    //     const formData = new FormData();

    //     console.log(form);

    //     formData.append('image', this.file);
    //     formData.append('categoryId', form.value.categoryId);
    //     formData.append('title', form.value.title);
    //     formData.append('description', form.value.description);
    //     formData.append('price', form.value.price);

    //     console.log(formData);
    //     console.log('image', form.value.image);
    //     console.log('categoryId', form.value.categoryId);
    //     console.log('title', form.value.title);
    //     console.log('description', form.value.description);
    //     console.log('price', form.value.price);
    //     if (this.editState === 0) {
    //       const cloth: Cloth = {
    //         id: this.id,
    //         title: this.title,
    //         description: this.description,
    //         price: this.price,
    //       };
    //       console.log(this.cloths);

    //       this.homeService.postCloth(cloth).subscribe({
    //         next: (response: AppResponse) => {
    //           this.cloths.push(response.data);
    //           this.ngOnInit();
    //         },
    //       });
    //     }
    //   }
    // }
    // onFileChange(event: any) {
    //   const fileInput = event.target;

    //   if (fileInput && fileInput.files.length > 0) {
    //     this.file = fileInput.files[0];

    //     console.log('Selected file:', this.file);
    //   }
    // }
  }

  onDelete(id: number | undefined) {
    console.log(id);
    if (id !== undefined) {
      this.homeService.deleteCloth(id).subscribe({
        next: (response: any) => {
          if (response && response.data) {
            this.cloths = response.data;
          }
        },
        error: (err) => {
          console.error('An error occurred:', err);
        },
      });
    }
  }
}
