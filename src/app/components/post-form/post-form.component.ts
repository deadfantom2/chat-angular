import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from "../../services/post.service";
import io from 'socket.io-client';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  socket: any;

  constructor( private fb: FormBuilder, private postService: PostService) {
    this.socket = io('http://localhost:3000');  // init link to the server, attack socket server
  }

  ngOnInit() {
    this.initValidForms();
  }

  initValidForms() {
    this.postForm = this.fb.group({
      post: ['', Validators.required]
    });
  }

  addPost(){
    this.postService.addPost(this.postForm.value).subscribe(data => {
      this.socket.emit('refresh', {});  // reshfresh must be declarated on the server too
      this.postForm.reset();
    });
  }



}
