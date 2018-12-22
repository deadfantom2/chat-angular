import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import lodash from 'lodash';
import {TokenService} from "../../services/token.service";
import io from 'socket.io-client';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  following = [];
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
      this.following = data.users.following;
    }, err => console.log(err))
  }

  unFollowUser(user){
    this.usersService.unfollowUser(user._id).subscribe(data => {
      console.log(data)
      this.socket.emit('refresh', {});
    });
  }

}
