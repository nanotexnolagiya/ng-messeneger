import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token = null;

  constructor(private http: Http) { }



}
