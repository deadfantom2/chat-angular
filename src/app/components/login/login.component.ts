import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from "../../services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;
  showSpinner: boolean = false;

  constructor( private authService: AuthService, private fb: FormBuilder, private router: Router, private tokenService: TokenService) { }

  ngOnInit() {
    this.initValidForms();
  }

  initValidForms() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser(){
    this.showSpinner = true;
    this.authService.loginUser(this.loginForm.value).subscribe(data => {
      console.log("data: ",data);
      this.tokenService.setToken(data.token);
      this.message = data.message;
      this.loginForm.reset();

      setTimeout(() => {
        this.router.navigate(['streams']);
      }, 3000);
    }, err => {
      console.log(err);
      this.showSpinner = false;
      this.message = err.error.message;
    })
  }

}
