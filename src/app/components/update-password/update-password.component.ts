import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UpdatePassword } from '../../models/user-model';
import { __values } from 'tslib';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit {

  updatePassForm!: FormGroup
  hidePassword: boolean = true;
  isOtpValid: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updatePassForm = this.fb.group({
      username: this.userService._username(),
      password: ['', Validators.required],
      otpText: ['', Validators.required]
    })
  }

  proceedUpdate() {
    if (this.updatePassForm.valid) {
      const updatePassword: UpdatePassword = this.updatePassForm.value;
      this.userService.UpdatePassword(updatePassword).subscribe(data => {
        if (data.responseCode === 200) {
          this.toastr.success('Password updated successfully', 'Update Password');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(data.errorMessage, 'Error');
        }
      })
    }
  }

  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }

  onOtpInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isOtpValid = input.value.length === 6;
  }

}
