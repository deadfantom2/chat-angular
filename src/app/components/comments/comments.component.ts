import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { PostService } from "../../services/post.service";
import { ActivatedRoute } from "@angular/router";
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {

  toolBarElement: any;
  socket: any;
  commentsFrom: FormGroup;
  post_id: any;
  comments: any = [];
  post: string;

  constructor( private fb: FormBuilder, private postService: PostService, private route: ActivatedRoute ) {
    this.socket = io('http://localhost:3000');  // init link to the server, attack socket server
  }

  ngOnInit() {
    this.toolBarElement = document.querySelector('.nav-content');
    this.post_id = this.route.snapshot.paramMap.get('id');
    this.getPost();
    this.socket.on('refreshPage', data => {
      this.getPost();
    });
    this.initValidForms();
  }

  initValidForms() {
    this.commentsFrom = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }

  ngAfterViewInit(){
    this.toolBarElement.style.display = 'none';
  }

  addComment(){
    this.postService.addComment(this.post_id, this.commentsFrom.value.comment).subscribe(data => {
      this.socket.emit('refresh', {});  // reshfresh must be declarated on the server too
      this.commentsFrom.reset();
      console.log(data)
    });
  }

  getPost(){
    this.postService.getPost(this.post_id).subscribe(data => {
      this.post = data.post.post;
      this.comments = data.post.comments.reverse();
    })
  }

}
