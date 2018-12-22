import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  message: string;
  showSpinner: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private tokenService: TokenService) {}

  ngOnInit() {
    this.initValidForms();
  }

  initValidForms() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  registerUser() {
    console.log(this.registerForm.value);
    this.authService.registerUser(this.registerForm.value).subscribe(
      data => {
        console.log(data);
        this.tokenService.setToken(data.token);
        this.message = data.message;
        this.registerForm.reset();
        this.showSpinner = true;
        setTimeout(() => {
          this.router.navigate(['streams']);
        }, 3000);
      },
      err => {
        console.log(err);
        this.showSpinner = false;
        this.message = err.error.message;
      }
    );
  }
}
