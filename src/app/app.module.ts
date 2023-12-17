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
import { MenubarModule } from 'primeng/menubar';
import { MenuBarComponent } from './nav/menu-bar/menu-bar.component';
import { TeamVotingComponent } from './logic/team-voting/team-voting.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AdminComponent } from './logic/admin/admin.component';
import { QuestionComponent } from './logic/question/question.component';
import { QuestionListComponent } from './logic/question-list/question-list.component';
import { QuestionBundleComponent } from './logic/question-bundle/question-bundle.component';

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
    QuestionBundleComponent
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
    MenuModule,
    MenubarModule,
    TabViewModule,
    ToastModule,
    TableModule,
    HttpClientModule,
    CheckboxModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
