import { Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/services/contact-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  contacts = [];

  constructor(
    private contactService: ContactService,
  ) {
    this.getContact();
   }

  ngOnInit() {
  }

  getContact() {
    this.contactService.getContacts().subscribe( (res: any)  => {
      if (res.status === 200) {
              this.contacts = res.data;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.message
            });
          }
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error in server'
        });
    })
}

}
