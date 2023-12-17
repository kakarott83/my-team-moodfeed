import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { VotingComponent } from './logic/voting/voting.component';
import { TeamVotingComponent } from './logic/team-voting/team-voting.component';
import { AdminComponent } from './logic/admin/admin.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'voting', component: VotingComponent},
  {path: 'team-voting', component: TeamVotingComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
