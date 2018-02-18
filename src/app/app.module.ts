import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppRouterModule } from './app-router.module';
import { SuiModule } from 'ng2-semantic-ui';
import { FormsModule } from '@angular/forms';
import { LocalStorageModule } from 'angular-2-local-storage';

import { ElectionService } from './services/election.service';


import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CreateComponent } from './pages/create/create.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRouterModule,
    SuiModule,
    FormsModule,
    LocalStorageModule.withConfig({
      prefix: 'ballot-app-',
      storageType: 'localStorage'
    })
  ],
  providers: [
    ElectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
