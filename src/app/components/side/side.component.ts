import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import io from 'socket.io-client';
import lodash from 'lodash';
import { TokenService } from "../../services/token.service";
import {Router} from "@angular/router";
import { UsersService } from "../../services/users.service";

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  socket: any;
  userData: any;
  user: any;

  constructor( private usersService: UsersService, private tokenService: TokenService ) {
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
      console.log("data ", data)
      this.userData = data.users;
    });
  }

}
