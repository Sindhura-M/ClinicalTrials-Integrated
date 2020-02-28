import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatProgressBarModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './login/index.component';
import { CreateAccountComponent } from './login/createAccount.component';
import { AccountSuccessComponent } from './login/accountSuccess.component';
import { AnswerQuestionsComponent } from './answerQuestions/answerQuestions.component';
import { HomeComponent } from './home/home.component';
import { BreastCancerComponent } from './breastCancer/breastCancer.component';
import { AboutCTCComponent } from './about/about.component';
import { StepperComponent } from './stepper/stepper.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatchResultsComponent } from './match-results/match-results.component';
import { TrialsComponent } from './trials/trials.component';

import { dataQAservice } from './services/data-QA.service';
import { ExportToExcelService } from './services/export-to-excel.service';
import { dataAccountProfile } from './services/dataAccountProfile.service';
import { MyAccountComponent } from './my-account/my-account.component';
import { IndividualTrialComponent } from './individual-trial/individual-trial.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConditionChangedConfirmationComponent } from './condition-changed-confirmation/condition-changed-confirmation.component';

const appRoutes: Routes = [
   { path: 'login', component: LoginComponent},
   { path: 'createaccount', component: CreateAccountComponent},
   { path: 'welcome', component: WelcomeComponent },
   { path: 'answerQuestions', component: AnswerQuestionsComponent},
   { path: 'home', component: HomeComponent},
   { path: 'breastCancer', component: BreastCancerComponent},
   { path: 'myaccount', component: MyAccountComponent, canActivate: [AuthGuard]},
   { path: 'about', component: AboutCTCComponent},
   { path: 'trials', component: TrialsComponent, canActivate: [AuthGuard]},
   { path: 'individualtrial/:id', component: IndividualTrialComponent},
   { path: 'users', component: UsersComponent},
   { path: 'userdetails/:userId', component: UserDetailsComponent, canActivate: [AuthGuard]},
  //  { path: 'hospitaldetails', component: HospitalDetailsComponent},
   { path: '', redirectTo: '/index', pathMatch: 'full'},
   { path: 'index', component: StepperComponent},
   { path: 'stepper', component: StepperComponent},
   { path: 'stepper/:step', component: StepperComponent},
   { path: '**', component: StepperComponent}
];

@NgModule({
  imports:      [ 
  	BrowserModule, 
  	FormsModule,
  	RouterModule.forRoot(appRoutes, {useHash: true}),
    NoopAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    MatPasswordStrengthModule.forRoot(),
    MatProgressBarModule,
    MatCheckboxModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [ 
  HomeComponent,
	AppComponent,
	QuizComponent, 
	HeaderComponent, 
	FooterComponent,
  IndexComponent, 
	CreateAccountComponent,
  AccountSuccessComponent,
	LoginComponent, 
  AnswerQuestionsComponent,
  BreastCancerComponent,
  WelcomeComponent,
  AboutCTCComponent,
  StepperComponent,
  MatchResultsComponent,
  TrialsComponent,
  MyAccountComponent,
  IndividualTrialComponent,
  UsersComponent,
  UserDetailsComponent,
  ConfirmationDialogComponent,
  ConditionChangedConfirmationComponent
  ],
  exports: [
     MatStepperModule,
     MatFormFieldModule,
     MatInputModule,
     MatRadioModule,
     MatSelectModule,
     MatTabsModule,
     MatExpansionModule,
     MatProgressBarModule,
     MatCheckboxModule,
     MatListModule,
     MatNativeDateModule,
     MatTableModule,
     MatTooltipModule,
     ReactiveFormsModule,
     MatMenuModule
   ],
  providers: [ dataQAservice, dataAccountProfile, {provide: LocationStrategy, useClass: HashLocationStrategy}, AuthGuard, AuthService,ExportToExcelService ],
  bootstrap:    [ AppComponent ],
  entryComponents: [ConfirmationDialogComponent,ConditionChangedConfirmationComponent]
})
export class AppModule { }
