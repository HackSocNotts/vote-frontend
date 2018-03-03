import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private authState = null;

  constructor(
    private af: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.authState = this.af.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  isAnonymous(): boolean {
    if (this.authState !== null) {
      return this.authState.isAnonymous;
    }
    return false;
  }

  isAuthed(): boolean {
    if (this.authState !== null && this.authState.uid !== undefined) {
      return true;
    }
    return false;
  }
}
