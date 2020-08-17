import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationRequest } from '../models';

@Injectable()
export class RegistrationApiService {

  constructor(
    private http: HttpClient) {  }

  getRegistrationFields() {
    return this.http.get('api/registration_fields');
  }

  registerUser(user: RegistrationRequest) {
    return this.http.post('api/users', user);
  }
}
