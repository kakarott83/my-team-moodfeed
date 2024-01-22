import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { VotingComponent } from './logic/voting/voting.component';
import { TeamVotingComponent } from './logic/team-voting/team-voting.component';
import { AdminComponent } from './logic/admin/admin.component';
import { HomeComponent } from './logic/home/home.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserProfileComponent } from './logic/user-profile/user-profile.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AuthGuard } from './auth/guard.guard';
import { WorktimeComponent } from './logic/worktime/worktime.component';
import { TravelComponent } from './logic/travel/travel.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'logout', component:LogoutComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'voting', component: VotingComponent, canActivate: [AuthGuard]},
  {path: 'worktime', component: WorktimeComponent, canActivate: [AuthGuard]},
  {path: 'travel', component: TravelComponent, canActivate: [AuthGuard]},
  {path: 'travel/:id', component: TravelComponent, canActivate: [AuthGuard]},
  {path: 'team-voting', component: TeamVotingComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
