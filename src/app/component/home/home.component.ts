import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { UserhomeService } from 'src/app/service/userhome.service';
import { AppResponse } from 'src/app/model/appResponse';
import { Home } from 'src/app/model/home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css'],
})
export class HomeComponent {
  
  constructor(private userhomeService: UserhomeService) {}
  homeName:string="";
homes:Home[]=[]
postCart(id:number){} 
 
ngOnInit(): void {
  this.userhomeService.getuserhome().subscribe({
    next: (response: AppResponse) => {
   
      if (response && response.data) {
        this.homes = response.data;
      } else {
        console.error('Invalid API response format:', response);
     
      }
    },
    error: (err) => {
      console.log('An error occurred:', err);
   
    },
    complete: () => console.log('There are no more actions happening.'),
  });
}}


