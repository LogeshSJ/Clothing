import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.css'],
})
export class AdmincategoryComponent implements OnInit {
  categoryName: string = '';
  INITIAL_CATEGORY: Category = { id: 0, title: '' };
  categories: Category[] = [];
  categoryModel: Category = this.INITIAL_CATEGORY ; 
  emitterValue=false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.categories = response.data;
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

  onSubmit(form: NgForm) {
    console.log('dasda');
 
    if (form.valid) {
      this.categoryService.postCategories(this.categoryModel).subscribe({
        next: (response: AppResponse) => {
          if (response && response.data) {
            this.categories = response.data;
            this.categoryModel = { ...this.INITIAL_CATEGORY };
            form.resetForm();
            // this.getCategories();
            this.loadCategories();
            console.log(response.data, 'asasas');
          }
        },
        error: (err) => {
          console.error('An error occurred:', err);
        },
      });
    } else {
      this.categoryService.putCategories(this.categoryModel).subscribe({
        next: (response: any) => {
          this.categories = response.data;
          this.categoryModel = this.INITIAL_CATEGORY;
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }
 
  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.categoryService.deleteCategories(id).subscribe({
        next: (response: any) => {
          this.categories = response.data;
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }
 
  onEdit(category: Category) {
    this.categoryModel = { ...category };
  }
}

