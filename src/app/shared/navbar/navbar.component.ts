import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthGuard
  ) { }

  ngOnInit() {
  }

  checkAuth() {
    return this.auth;
  }

}
