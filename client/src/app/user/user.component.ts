import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';
import { ContactService } from '../shared/services/contact-service';
import { TokenService } from '../shared/services/token-service';
import { AuthService } from '../shared/services/auth-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  createContact = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
  
  contacts = [];
  constructor(
    private route: Router,
    private contactService: ContactService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {
    this.verify();
  }

  verify() {
      if (!localStorage.getItem('refreshToken')) {   // token ni tekshirish kerak !
          this.route.navigate(['']);
      }
      if (this.tokenService.token === null) {
          this.authService.auth(localStorage.getItem('refreshToken')).subscribe( res => {
            if (res.json().status === 200 ) {
            this.tokenService.token = res.json().data.token;
            let token = res.json().data.newRefreshToken;
            localStorage.setItem('refreshToken', res.json().data.newRefreshToken );
            // const socket = socketioJwt.connect('http://localhost:9000', {
            //   extraHeaders: { Authorization: `Bearer ${token}` }
            // });
            // console.log(socket);
            
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.json().message
              });  
            }
          }, err=> {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error in server'
            });
          })
      }
  }

  logOut() {
    Swal.fire({
      icon: 'success',
      title: 'Пока',
      text: 'До скорого'
    });
    localStorage.removeItem('refreshToken');
    this.route.navigate(['']);
  }

  create() { 
    this.contactService.create(
      this.createContact.value.email,
      this.createContact.value.phone,
      this.createContact.value.firstName,
      this.createContact.value.lastName
    )
    .subscribe( ( result: any)  => {
        if (result.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: result.message
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: result.message
          });
        }
        
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Сервер не работают'
      });
    })
  }

  ngOnInit() {
  }

}
