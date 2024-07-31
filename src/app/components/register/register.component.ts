import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { UserRegistration } from '../../models/user-model';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  _response: any;

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router
  ) { }

  _registerForm = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    password: this.builder.control('', Validators.required),
    confirmpassword: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.required)
  });

  proceedRegister() {
    debugger
    if (this._registerForm.valid) {
      let _obj: UserRegistration = {
        userName: this._registerForm.value.username as string,
        password: this._registerForm.value.password as string,
        name: this._registerForm.value.name as string,
        email: this._registerForm.value.email as string,
        phone: this._registerForm.value.phone as string
      };
      this.userService.UserRegistration(_obj).subscribe(data => {
        this._response = data;
        if (this._response.responseCode == 200) {
          this.toaster.info('Validate OTP and complete the registration', 'Registration');
          this.router.navigateByUrl('/confirm-otp');
        } else {
          this.toaster.error('Failed due to:' + this._response.message, 'Registration Failed');
        }
      });
    }
  }

  clickEvent(event: MouseEvent, field: string) {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
    event.stopPropagation();
  }
}
