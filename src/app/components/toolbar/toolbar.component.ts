import { Component, OnInit } from '@angular/core';
import { TokenService } from "../../services/token.service";
import { Router } from "@angular/router";
import * as M from 'materialize-css';
import {UsersService} from "../../services/users.service";
import * as moment from 'moment';
import io from 'socket.io-client';
import lodash from 'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  socket: any;
  token: any;
  user: any;
  notifications = [];
  countNoitifications = [];

  constructor( private tokenService: TokenService, private userService: UsersService, private router: Router ) {
    this.socket = io('http://localhost:3000');  // init link to the server, attack socket server
  }

  ngOnInit() {
    // this.token = this.tokenService.getToken();
    this.user = this.tokenService.getPayload();
    const dropDown = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropDown, {
      alignment: 'left',
      hover: true,
      coverTrigger: false
    });
    this.getUser();
    this.socket.on('refreshPage', data => {
      this.getUser();
    });
  }

  getUser(){
    this.userService.getUserById(this.user.user._id).subscribe(data => {
      this.notifications = data.users.notifications.reverse();
      const value = lodash.filter(this.notifications, ['read', false]);
      this.countNoitifications = value;
      console.log(value.length)
    }, err => {
      if(err.error.token === null){
        this.tokenService.deleteToken();
        this.router.navigate(['']);
      }
    });
  }

  markAll(){
    this.userService.markAllRead().subscribe(data => {
      console.log(data)
      this.socket.emit('refresh', {});
    });
  }

  logout(){
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }

  goToHome(){
    this.router.navigate(['streams']);
  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }

}
