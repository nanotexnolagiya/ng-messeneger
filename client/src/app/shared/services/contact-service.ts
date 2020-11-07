import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
    ) { }

  create(
      email,
      phone,
      firstName,
      lastName
  ) {
      const body = {
          email,
          phone,
          firstName,
          lastName
      }
      return this.http.post(config.URL + '/api/v1/contacts/me', body);

  }

  getContacts() {
    return this.http.get(config.URL + '/api/v1/contacts/me');
  }

}
