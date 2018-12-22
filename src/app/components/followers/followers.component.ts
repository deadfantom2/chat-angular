import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import lodash from 'lodash';
import {TokenService} from "../../services/token.service";
import io from 'socket.io-client';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers = [];
  user: any;
  socket: any;

  constructor( private usersService: UsersService, private tokenService: TokenService) {
    this.socket = io('http://localhost:3000');  // init link to the server, attack socket server
  }

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    this.getUser();
    this.socket.on('refreshPage', data => {
      this.getUser();
    });
  }

  getUser(){
    this.usersService.getUserById(this.user.user._id).subscribe(data => {
      console.log(data)
      this.followers = data.users.followers;
    }, err => console.log(err))
  }

}
