import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

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

  auth(refreshToken) {
    const headers = new Headers();
      headers.append('Refresh-Token', refreshToken);
    return this.http.get(config.URL + '/api/v1/auth', { headers: headers });
  }

}
