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
  chats = [];
  constructor(
    private contactService: ContactService,
    private tokenService: TokenService,
    private chatService: ChatService
  ) { 
    this.getContact();
    this.getChats();
  }

  ngOnInit() {
  }

  getContact() {
    let token = 'Bearer ' + this.tokenService.token;
      this.contactService.getContacts(token).subscribe( res => {
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
    let token = 'Bearer ' + this.tokenService.token;
    this.chatService.create(token).subscribe( res => {
        console.log(res.json());
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error in server'
      });
    })
  }

  getChats() {
    let token = 'Bearer ' + this.tokenService.token;
    this.chatService.getChats(token).subscribe( res => {
      if (res.json().status === 200) {
        this.chats = res.json().data;
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

}
