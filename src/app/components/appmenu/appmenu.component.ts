import { Component, DoCheck, effect, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MenuByRol } from '../../models/user-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appmenu',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css'
})
export class AppmenuComponent implements OnInit, DoCheck {

  menuList!: MenuByRol[];
  loginUser = ''
  showMenu = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    effect(() => {
      this.menuList = this.userService._menuList();
    })
  }
  ngDoCheck(): void {
    this.loginUser = localStorage.getItem('username') || '';
    this.setAccess();
  }

  setAccess() {
    const hiddenRoutes = [
      '/login',
      '/register',
      '/reset-password',
      '/forgot-password',
      '/update-password'
    ];

    this.showMenu = !hiddenRoutes.includes(this.router.url);
  }

  ngOnInit(): void {
    const userRol = localStorage.getItem('userRol');
    if (userRol) {
      this.userService.LoadMenuByRol(userRol).subscribe(item => {
        this.menuList = item;
      });
    }
  }
}
