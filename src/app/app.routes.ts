import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ConfirmOtpComponent } from './components/confirm-otp/confirm-otp.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserComponent } from './components/user/user.component';
import { CustomerComponent } from './components/customer/customer.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'confirm-otp', component: ConfirmOtpComponent },
    { path: 'forgot-password', component: ForgetPasswordComponent },
    { path: 'update-password', component: UpdatePasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'customer', component: CustomerComponent, canActivate: [authGuard] },
    { path: 'user', component: UserComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
