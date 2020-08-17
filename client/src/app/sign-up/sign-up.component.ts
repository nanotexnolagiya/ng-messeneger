import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../shared/services/token-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  login(email, code) {

      this.authService.checkCode(email, code).subscribe(result => {
        
        const res = result.json();
        console.log(result.json());
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
        }
      });
  }

}
