import { Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/services/contact-service';
import { TokenService } from '../shared/services/token-service';
import Swal from 'sweetalert2';
import { ChatService } from '../shared/services/chat-service';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.css']
})
export class ListChatComponent implements OnInit {


  contacts = [];
  constructor(
    private contactService: ContactService,
    private tokenService: TokenService,
    private chatService: ChatService
  ) { 
    this.getContact();
  }

  ngOnInit() {
  }

  getContact() {
    let token = 'Bearer ' + this.tokenService.token;
    console.log(this.tokenService.token);
      this.contactService.getContacts(token).subscribe( res => {
          console.log(res.json());
            if (res.json().status === 200) {
                this.contacts = res.json().data;
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.json().message
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

  createChat() {
    let aToken = this.tokenService.token;
    this.chatService.create(aToken).subscribe( res => {
        console.log(res.json());
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error in server'
      });
    })
    
  }

}
