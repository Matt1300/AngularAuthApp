import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword } from '../../models/user-model';
import { ResponseAPI } from '../../models/response-model';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  _resetForm!: FormGroup;
  _response!: ResponseAPI;
  hideCurrentPassword = true;
  hideNewPassword = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this._resetForm = this.fb.group({
      username: [localStorage.getItem('username'), Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  resetPassword() {
    if (this._resetForm.valid) {
      const resetData: ResetPassword = this._resetForm.value;
      this.userService.ResetPassword(resetData).subscribe(data => {
        this.handleResetResponse(data);
      });
    }
  }

  private handleResetResponse(response: ResponseAPI) {
    this._response = response;
    if (this._response.responseCode === 200) {
      this.toastr.success("Please login with new password", "Password changed");
      this.router.navigate(['/login']);
    } else {
      this.toastr.error("Password reset failed", "Error");
    }
  }


  clickEvent(event: MouseEvent, field: string): void {
    event.preventDefault();
    if (field === 'oldPassword') {
      this.hideCurrentPassword = !this.hideCurrentPassword;
    } else if (field === 'newPassword') {
      this.hideNewPassword = !this.hideNewPassword;
    }
    event.stopPropagation();
  }

}
