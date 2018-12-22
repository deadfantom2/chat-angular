import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TokenService} from "../../services/token.service";
import {MessageService} from "../../services/message.service";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  receiver: string;
  user: any;
  message: string;
  receiverData: any;

  constructor( private tokenService: TokenService, private msgService: MessageService, private route: ActivatedRoute, private userService: UsersService ) { }

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    console.log(this.user.user._id)
    this.route.params.subscribe(params => {
      console.log(params)
      this.receiver = params.name;
      this.getUserByUsername(this.receiver);
    })
  }

  getUserByUsername(name){
    this.userService.getUserByUsername(name).subscribe(data => {
      this.receiverData = data.users;
      console.log("receiverData ", this.receiverData._id)
      console.log("receiverData ", this.receiverData.username)
    });
  }

  sendMessage(){
    if(this.message){
      this.msgService.sendMessage(this.user.user._id, this.receiverData._id, this.receiverData.username, this.message).subscribe(data => {
        console.log(data)
      });
    }
  }

}
