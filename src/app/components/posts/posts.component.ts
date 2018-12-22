import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import * as moment from 'moment';
import io from 'socket.io-client';
import lodash from 'lodash';
import { TokenService } from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  socket: any;
  posts = [];
  user: any;

  constructor( private postService: PostService, private tokenService: TokenService, private router: Router ) {
    this.socket = io('http://localhost:3000');  // init link to the server, attack socket server
  }

  ngOnInit() {
    this.user = this.tokenService.getPayload();
    console.log('user: ', this.user.user.username)
    this.AllPosts();
    this.socket.on('refreshPage', data => {
      this.AllPosts();
    });
  }

  AllPosts(){
    this.postService.showAllPost().subscribe(data => {
      console.log(data)
      this.posts = data.posts;
    }, err => {
      if(err.error.token === null){
        this.tokenService.deleteToken();
        this.router.navigate(['']);
      }
    })
  }

  likePost(post){
    this.postService.addLike(post).subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});

    });
  }

  openCommentBox(post){
    this.router.navigate(['post', post._id])
  }

  CheckInLikesArray(arr, username){
    return lodash.some(arr, {username: username})
  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }


}
