import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { VotingComponent } from './logic/voting/voting.component';
import { VotingDetailComponent } from './logic/voting-detail/voting-detail.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { FilterService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MenuBarComponent } from './nav/menu-bar/menu-bar.component';
import { TeamVotingComponent } from './logic/team-voting/team-voting.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { AdminComponent } from './logic/admin/admin.component';
import { QuestionComponent } from './logic/question/question.component';
import { QuestionListComponent } from './logic/question/question-list/question-list.component';
import { HomeComponent } from './logic/home/home.component';
import { ThanksDialogComponent } from './logic/thanks-dialog/thanks-dialog.component';
import { DepartmentListComponent } from './logic/department/department-list/department-list.component';
import { DepartmentComponent } from './logic/department/department.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserProfileComponent } from './logic/user-profile/user-profile.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { AuthService } from './services/auth.service';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { TeamVotingListComponent } from './logic/team-voting/team-voting-list/team-voting-list.component';
import { TeamVotingChartComponent } from './logic/team-voting/team-voting-chart/team-voting-chart.component';
import { NotVerfifiedComponent } from './auth/not-verfified/not-verfified.component';
import { HomeChartWorkweekComponent } from './logic/home/home-chart-workweek/home-chart-workweek.component';
import { HomeChartTravelComponent } from './logic/home/home-chart-travel/home-chart-travel.component';
import { WorktimeComponent } from './logic/worktime/worktime.component';
import { VotingDialogComponent } from './logic/voting/voting-dialog/voting-dialog.component';
import { TravelComponent } from './logic/travel/travel.component';
import { WorktimeListComponent } from './logic/worktime/worktime-list/worktime-list.component';
import { TravelListComponent } from './logic/travel/travel-list/travel-list.component';
import { TravelFormComponent } from './logic/travel/travel-form/travel-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VotingComponent,
    VotingDetailComponent,
    MenuBarComponent,
    TeamVotingComponent,
    AdminComponent,
    QuestionComponent,
    QuestionListComponent,
    HomeComponent,
    ThanksDialogComponent,
    DepartmentListComponent,
    DepartmentComponent,
    LogoutComponent,
    RegisterComponent,
    UserProfileComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    TeamVotingListComponent,
    TeamVotingChartComponent,
    NotVerfifiedComponent,
    HomeChartWorkweekComponent,
    HomeChartTravelComponent,
    WorktimeComponent,
    VotingDialogComponent,
    TravelComponent,
    WorktimeListComponent,
    TravelListComponent,
    TravelFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    InputTextareaModule,
    DynamicDialogModule,
    MultiSelectModule,
    TooltipModule,
    ProgressSpinnerModule,
    FileUploadModule,
    DropdownModule,
    ChipsModule,
    RatingModule,
    CalendarModule,
    MenuModule,
    MenubarModule,
    ChartModule,
    ConfirmDialogModule,
    TabViewModule,
    ToastModule,
    TableModule,
    HttpClientModule,
    CheckboxModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore
    AngularFireStorageModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
