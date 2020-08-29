import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: Http,
    ) { }

  create(
      email,
      phone,
      firstName,
      lastName,
      accessToken
  ) {
      const body = {
          email,
          phone,
          firstName,
          lastName
      }
      const headers = new Headers();
      headers.append('Authorization', accessToken);
      return this.http.post(config.URL + '/api/v1/contacts/me', body, {headers: headers});

  }

  getContacts(
    accessToken
  ) {
    const headers = new Headers();
    headers.append('Authorization', accessToken);
    return this.http.get(config.URL + '/api/v1/contacts/me', {headers: headers});
  }

}
