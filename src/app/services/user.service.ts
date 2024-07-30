import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserRegistration } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  UserRegistration(data: UserRegistration) {
    let response
    response = this.http.post(this.baseUrl + 'User/UserRegistration', data);
    return response;
  }
}
