import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CreateComponent } from './pages/create/create.component';
import {HomeComponent} from './pages/home/home.component';
import {BallotComponent} from './pages/ballot/ballot.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AboutComponent} from './pages/about/about.component';
import {ResultsComponent} from './pages/results/results.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'create', component: CreateComponent },
  { path: 'about', component: AboutComponent },
  { path: 'ballot', component: BallotComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
