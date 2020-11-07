import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ChatService } from '../shared/services/chat-service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  id = null;
  chat : any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
         console.log(this.id);
      } else {
        this.id = null;
      }
  
    });
  }

}
