import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { RegisterConfirm } from '../../models/user-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [FormsModule, MaterialModule, RouterLink, CommonModule],
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.css'
})
export class ConfirmOtpComponent implements OnInit {

  otpText: string = '';
  isOtpValid: boolean = false;
  regResponse!: RegisterConfirm;
  _response: any;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.regResponse = this.userService._registerResponse();
  }

  onOtpInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isOtpValid = input.value.length === 6;
  }

  confirmOTP() {
    this.regResponse.otpText = this.otpText;
    this.userService.ConfirmRegistration(this.regResponse).subscribe(data => {
      this._response = data;
      if (this._response.responseCode === 200) {
        this.toastr.success('Registration successful', 'Success');
        this.userService._registerResponse.set({ userId: 0, username: '', otpText: '' });
        this.router.navigate(['/login']);
      } else {
        this.toastr.error('Registration failed: ' + this._response.errorMessage, 'Error');
      }
    })
  };
}


