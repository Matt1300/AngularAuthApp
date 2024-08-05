import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { GenerateToken, LoginResponse } from '../../models/user-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  _loginForm!: FormGroup;
  hidePassword = true;
  _response!: LoginResponse;

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.userService._menuList.set([]);

    this._loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  async proceedLogin() {
    if (this._loginForm.valid) {
      const loginData: GenerateToken = this._loginForm.value;
      this.userService.ProceedLogin(loginData).subscribe(data => {
        this._response = data;
        localStorage.setItem('token', this._response.token);
        localStorage.setItem('username', loginData.username);
        localStorage.setItem('userRol', this._response.userRol);

        this.userService.LoadMenuByRol(this._response.userRol).subscribe(item => {
          this.userService._menuList.set(item);
        })

        this.router.navigate(['/']);
      }, error => {
        this.toaster.error('Invalid username or password', error.error.title);
        this.resetForm();
      });
    }
  }

  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }

  resetForm(): void {
    this._loginForm = this.fb.group({
      username: [this._loginForm.value.username, Validators.required],
      password: ['', Validators.required],
    })
  }

}
