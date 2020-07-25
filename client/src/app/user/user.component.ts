import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private route: Router
  ) {
    this.verify();
  }

  verify() {
      if (!localStorage.getItem('token')) {   // hali token ni tekshirish kerak !
          this.route.navigate(['sign-up']);
      }
  }

  logOut() {
    Swal.fire({
      icon: 'success',
      title: 'Пока',
      text: 'До скорого'
    });
    localStorage.removeItem('token');
    this.route.navigate(['sign-up']);
  }

  ngOnInit() {
  }

}
