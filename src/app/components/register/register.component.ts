import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { RegisterConfirm, UserRegistration } from '../../models/user-model';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  _registerForm: FormGroup = new FormGroup({});
  hidePassword = true;
  hideConfirmPassword = true;
  _response: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  proceedRegister() {
    if (this._registerForm.valid) {
      const { username, password, name, email, phone } = this._registerForm.value;
      const userRegistration: UserRegistration = { userName: username, password, name, email, phone };

      this.userService.UserRegistration(userRegistration).subscribe(data => {
        this.handleRegistrationResponse(data, username);
      });
    }
  }

  private handleRegistrationResponse(response: any, username: string) {
    this._response = response;
    if (this._response.responseCode === 200) {
      let _confirmObj: RegisterConfirm = {
        userId: parseInt(this._response.result),
        username: username,
        otpText: ''
      }
      this.userService._registerResponse.set(_confirmObj);
      this.toaster.info('Validate OTP and complete the registration', 'Registration');
      this.router.navigateByUrl('/confirm-otp');
    } else {
      this.toaster.error('Failed due to:' + this._response.message, 'Registration Failed');
    }
  }

  clickEvent(event: MouseEvent, field: string): void {
    event.preventDefault();
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
    event.stopPropagation();
  }
}
