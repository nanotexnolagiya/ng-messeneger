import { Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/services/contact-service';
import Swal from 'sweetalert2';
import { ChatService } from '../shared/services/chat-service';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.css']
})
export class ListChatComponent implements OnInit {


  chats = [];
  constructor(
    private chatService: ChatService
  ) { 
    this.getChats();
  }

  ngOnInit() {
  }

  createChat() {
    this.chatService.create().subscribe( (res : any) => {
        if (res.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: res.message
          }); 
          this.getChats();
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

  getChats() {
    this.chatService.getChats().subscribe( ( res: any) => {
      if (res.status === 200) {
        this.chats = res.data;
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
