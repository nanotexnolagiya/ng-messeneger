import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient
    ) { }

  create() { 
      return this.http.post(config.URL + '/api/v1/chats/me', null);
  }

  getChats() { 
      return this.http.get(config.URL + '/api/v1/chats/me');
  }

}
