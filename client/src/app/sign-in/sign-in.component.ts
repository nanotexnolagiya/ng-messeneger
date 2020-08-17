import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../shared/services/auth-service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { TokenService } from '../shared/services/token-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  status = false;
  spinner = false;
  profile = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private authService: AuthService,
    private route: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
  }

  send(email) {
    this.spinner = true;
    this.authService.login(email).subscribe( result => {
      const res = result.json();
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Good',
          text: res.data
        });
        this.spinner = false;
        this.status = true;
      } else  {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Email not found'
        });
        this.status = false;
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error in server'
      });
    }
    );
  }

  sign() {
    this.spinner = true;
    this.authService.checkCode(
        this.profile.value.email, 
        this.profile.value.password)
        .subscribe(result => {
          const res = result.json();
          if (res.status === 200) {
            localStorage.setItem('refreshToken', res.data.refreshToken);
            this.tokenService.token = res.data.token;
            Swal.fire({
              icon: 'success',
              title: 'Good',
              text: res.message
            });
            this.route.navigate(['user']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Email or code invalid'
            });
             this.spinner = false;
            }
          }, err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error in server'
            });
          });
} 


}
