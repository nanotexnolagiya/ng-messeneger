import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: Http
    ) { }

  create( 
    accessToken
  ) { 
      const headers = new Headers();
      headers.append('Authorization', accessToken);
      return this.http.post(config.URL + '/api/v1/chats/me', {headers: headers});

  }

}
