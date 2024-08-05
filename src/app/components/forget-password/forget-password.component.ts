import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { ResponseAPI } from '../../models/response-model';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  username: string = '';
  isOtpValid: boolean = false;
  _response!: ResponseAPI;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) { }

  Proceed() {
    this.userService.ForgotPassword(this.username).subscribe(data => {
      this._response = data;
      if (this._response.responseCode === 200) {
        this.userService._username.set(this.username);
        this.toastr.success('OTP sent to the registered email', 'Forgot Password');
        this.router.navigate(['/update-password']);
      } else {
        this.toastr.error(this._response.errorMessage, 'Error');
      }
    })
  }

}
