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
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
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
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
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
import { ReasonComponent } from './logic/reason/reason.component';
import { ReasonFormComponent } from './logic/reason/reason-form/reason-form.component';
import { ReasonListComponent } from './logic/reason/reason-list/reason-list.component';
import { SpendtypComponent } from './logic/spendtyp/spendtyp.component';
import { SpendtypListComponent } from './logic/spendtyp/spendtyp-list/spendtyp-list.component';
import { SpendtypFormComponent } from './logic/spendtyp/spendtyp-form/spendtyp-form.component';
import { CustomerComponent } from './logic/customer/customer.component';
import { CustomerFormComponent } from './logic/customer/customer-form/customer-form.component';
import { CustomerListComponent } from './logic/customer/customer-list/customer-list.component';
import { CountryComponent } from './logic/country/country.component';
import { CountryListComponent } from './logic/country/country-list/country-list.component';
import { CountryFormComponent } from './logic/country/country-form/country-form.component';

import {LOCALE_ID} from '@angular/core';
import { TestComponent } from './logic/test/test.component';
import { UserService } from './services/shared/user.service';
import { VerifyAdminPendingComponent } from './logic/verify-admin-pending/verify-admin-pending.component';
import { DataService } from './services/shared/data.service';
import { LastTravelsComponent } from './logic/home/last-travels/last-travels.component';
import { BasicDialogComponent } from './logic/basic-dialog/basic-dialog.component';
import { CurrencySuffixDirective } from './logic/helpers/appCurrencySuffix';
import { CurrencyDialogComponent } from './logic/dialogs/currency-dialog/currency-dialog.component'
import { DatePipe } from '@angular/common';
import { DaysListComponent } from './logic/travel/days-list/days-list.component';
import { CicCheckboxComponent } from './components/cic-checkbox/cic-checkbox.component';
import { UtilitiesService } from './services/shared/utilities.service';
import { ConfirmDialogComponent } from './logic/dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    CurrencySuffixDirective,
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
    TravelFormComponent,
    ReasonComponent,
    ReasonFormComponent,
    ReasonListComponent,
    SpendtypComponent,
    SpendtypListComponent,
    SpendtypFormComponent,
    CustomerComponent,
    CustomerFormComponent,
    CustomerListComponent,
    CountryComponent,
    CountryListComponent,
    CountryFormComponent,
    TestComponent,
    VerifyAdminPendingComponent,
    LastTravelsComponent,
    BasicDialogComponent,
    CurrencyDialogComponent,
    DaysListComponent,
    CicCheckboxComponent,
    ConfirmDialogComponent
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
    DialogModule,
    MultiSelectModule,
    TooltipModule,
    FieldsetModule,
    ProgressSpinnerModule,
    FileUploadModule,
    DropdownModule,
    InputGroupAddonModule,
    InputGroupModule,
    AutoCompleteModule,
    ChipsModule,
    PanelModule,
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
  providers: [
    AuthService,
    {provide: 'LOCALE_ID', useValue: 'de'},
    UserService,
    DataService,
    DatePipe,
    UtilitiesService,
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
