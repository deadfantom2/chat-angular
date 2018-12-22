import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import lodash from 'lodash';
import {TokenService} from "../../services/token.service";
import io from 'socket.io-client';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  users = [];
  loggedInUser: any;
  userArr = [];
  socket: any;

  constructor( private usersService: UsersService, private tokenService: TokenService) {
    this.socket = io('http://localhost:3000');  // init link to the server, attack socket server
  }

  ngOnInit() {
    this.loggedInUser = this.tokenService.getPayload();
    this.getAllUsers();
    this.getUser();
    this.socket.on('refreshPage', data => {
      this.getAllUsers();
      this.getUser();
    });
  }

  getAllUsers(){
    this.usersService.getAllUsers().subscribe(data => {
      console.log(data);
      lodash.remove(data.users, {username: this.loggedInUser.user.username})  //si on est connecter on est pas afficher dans la boucle virtuelle
      this.users = data.users;
    })
  }

  getUser(){
    this.usersService.getUserById(this.loggedInUser.user._id).subscribe(data => {
      this.userArr = data.users.following;
    })
  }

  followUser(user){
    this.usersService.followUser(user._id).subscribe(data => {
      console.log(data)
      this.socket.emit('refresh', {});

    })
  }

  checkInArray(arr, id){
    const result = lodash.find(arr, ['userFollowed._id', id]);
    if(result){
      return true;
    }else{
      return false;
    }
  }

}























