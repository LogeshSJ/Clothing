import { Component, OnInit } from '@angular/core';
import { Cloth } from 'src/app/model/cloth';
import { UserDetail } from 'src/app/model/user-detail';
import { UserService } from 'src/app/service/user.service';
import { UserhomeService } from 'src/app/service/userhome.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  totalCloth = 0;
  constructor(
    private userService: UserService,
    private userHomeService: UserhomeService
  ) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let users: UserDetail[] = response.data;
        this.totalUsers = users.length;
      },
      error: (err) => {
        console.error('Error loading total users:', err);
      },
    });

    this.userHomeService.getuserhome().subscribe({
      next: (response: any) => {
        let cloth: Cloth[] = response.data;
        this.totalCloth = cloth.length;
      },
      error: (err) => {
        console.error('Error loading total cloths:', err);
      },
    });
  }
}
