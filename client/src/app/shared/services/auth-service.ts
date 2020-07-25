import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) { }

  checkCode(
    email: string,
    code: Number
    ) {
      const body = {
        email,
        code
      };

      return this.http.post(config.URL + '/api/v1/check-code', body);
  }

  login(email) {
    const body = {
      email
    }
    return this.http.post(config.URL + '/api/v1/login', body);
  }

}
