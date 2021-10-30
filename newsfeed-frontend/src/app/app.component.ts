import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newsfeed';

  constructor(public authService: AuthService,
              private router: Router) {
  }

  navToFeed() {
    this.router.navigateByUrl('feed');
  }

  navToProfile() {
    const userId = this.authService.loggedInUser?.userId;
    this.router.navigateByUrl(`/profile/${userId}`);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}

