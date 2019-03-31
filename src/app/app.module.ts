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

import { AuthGuard } from './guards/auth.guard';

import { ElectionService } from './services/election.service';


import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CreateComponent } from './pages/create/create.component';
import { HomeComponent } from './pages/home/home.component';
import { BallotComponent } from './pages/ballot/ballot.component';
import {BallotService} from './services/ballot.service';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {ElectorateService} from './services/electorate.service';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {CandidatesService} from './services/candidates.service';
import { StvBallotComponent } from './ballots/stv-ballot/stv-ballot.component';
import { AvBallotComponent } from './ballots/av-ballot/av-ballot.component';
import { BasicBallotComponent } from './ballots/basic-ballot/basic-ballot.component';
import { NoAbstainBallotComponent } from './ballots/no-abstain-ballot/no-abstain-ballot.component';
import { ResultsComponent } from './pages/results/results.component';
import { ProccessedResultsComponent } from './pages/results/proccessed-results/proccessed-results.component';
import { ReceivedVotesComponent } from './pages/results/recieved-votes/recieved-votes.component';
import { Nl2brPipe } from './pipes/nl2br.pipe';
import { VoterGuard } from './guards/voter.guard';
import { CalculateService } from './services/calculate.service';
import {HttpClientModule} from '@angular/common/http';
import { GetCodeComponent } from './pages/get-code/get-code.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    CreateComponent,
    HomeComponent,
    BallotComponent,
    AboutComponent,
    DashboardComponent,
    StvBallotComponent,
    AvBallotComponent,
    BasicBallotComponent,
    NoAbstainBallotComponent,
    ResultsComponent,
    ProccessedResultsComponent,
    ReceivedVotesComponent,
    Nl2brPipe,
    GetCodeComponent
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
      prefix: 'ballot-app',
      storageType: 'localStorage'
    }),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'ui primary button',
      cancelButtonClass: 'ui button'
    }),
    HttpClientModule
  ],
  providers: [
    ElectionService,
    BallotService,
    AuthGuard,
    ElectorateService,
    CandidatesService,
    VoterGuard,
    CalculateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
