import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  error: {name: string, message: string} = {name: '', message: ''};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password)
    .catch(error => {
      this.error = error;
    })
  }

}
