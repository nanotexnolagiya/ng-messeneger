import { Component, OnInit } from '@angular/core';
import { TokenService } from '../shared/services/token-service';
import { ContactService } from '../shared/services/contact-service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private contactService: ContactService
  ) {
   }

  ngOnInit() {
  }

  

}
