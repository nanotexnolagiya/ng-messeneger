import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth-service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  send(email) {
    this.authService.login(email).subscribe( result => {
      const res = result.json();
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Good',
          text: res.data
        });
        this.route.navigate(['sign-up']);
      } else  {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Email not found'
        });
      }
    });
  }

}
