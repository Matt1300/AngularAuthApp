import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { GenerateToken, LoginResponse, MenuByRol, MenuPermission, RegisterConfirm, ResetPassword, UpdatePassword, UserRegistration } from '../models/user-model';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  _registerResponse = signal<RegisterConfirm>({
    userId: 0,
    username: '',
    otpText: ''
  });

  _menuList = signal<MenuByRol[]>([]);

  _username = signal<string>('');

  UserRegistration(data: UserRegistration): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${this.baseUrl}User/UserRegistration`, data);
  }

  ConfirmRegistration(data: RegisterConfirm): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${this.baseUrl}User/ConfirmRegistration`, data);
  }

  ProceedLogin(data: GenerateToken): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}Authorize/GenerateToken`, data);
  }

  LoadMenuByRol(rol: string): Observable<MenuByRol[]> {
    const params = new HttpParams().set('userRol', rol);
    return this.http.get<MenuByRol[]>(`${this.baseUrl}UserRol/GetAllMenusByRol`, { params });
  }

  ResetPassword(data: ResetPassword): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${this.baseUrl}User/ResetPassword`, data);
  }

  ForgotPassword(username: string): Observable<ResponseAPI> {
    const params = new HttpParams().set('username', username);
    return this.http.post<ResponseAPI>(`${this.baseUrl}User/ForgetPassword`, null, { params })
  }

  UpdatePassword(data: UpdatePassword): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${this.baseUrl}User/UpdatePassword`, data);
  }

  GetMenuPermission(rol: string, menu: string): Observable<MenuPermission> {
    const params = new HttpParams().set('userRol', rol).set('menucode', menu);
    return this.http.get<MenuPermission>(`${this.baseUrl}UserRol/GetMenuPermissionByRol`, { params });
  }
}
