import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { AuthService } from "../app/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  loadedFeature = "recipe";

  ngOnInit() {

    this.authService.loadUser();

  }
  
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
