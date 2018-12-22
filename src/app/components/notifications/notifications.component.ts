import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import lodash from 'lodash';
import * as moment from 'moment';
import {TokenService} from "../../services/token.service";
import io from 'socket.io-client';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications = [];
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
    // this.usersService.getUserById(this.user.user._id).subscribe(data => {
    this.usersService.getUserByUsername(this.user.user.username).subscribe(data => {
      console.log(data)
      this.notifications = data.users.notifications.reverse();
    }, err => console.log(err))
  }

  markNotification(notification){
    this.usersService.markNotification(notification._id).subscribe(data => {
      console.log(data)
      this.socket.emit('refresh', {});
    });
  }

  deleteNotfication(notification){
    this.usersService.markNotification(notification._id, true).subscribe(data => {
      console.log(data)
      this.socket.emit('refresh', {});
    });
  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }

}
