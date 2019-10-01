import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatProgressBarModule} from '@angular/material';
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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import { MatchResultsComponent } from './match-results/match-results.component';
import { TrialsComponent } from './trials/trials.component';

import { dataQAservice } from './services/data-QA.service';
import { dataAccountProfile } from './services/dataAccountProfile.service';
import { MyAccountComponent } from './my-account/my-account.component';


const appRoutes: Routes = [
   { path: 'login', component: StepperComponent },
   { path: 'welcome', component: WelcomeComponent },
   { path: 'answerQuestions', component: AnswerQuestionsComponent },
   { path: 'home', component: HomeComponent},
   { path: 'breastCancer', component: BreastCancerComponent},
   { path: 'myaccount', component: MyAccountComponent},
   { path: 'about', component: AboutCTCComponent},
   { path: 'trials', component: TrialsComponent },
   { path: '', redirectTo: '/login', pathMatch: 'full'},
   { path: '**', component: StepperComponent }
];

@NgModule({
  imports:      [ 
  	BrowserModule, 
  	FormsModule,
  	RouterModule.forRoot(appRoutes),
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
  MyAccountComponent
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
     ReactiveFormsModule,
     MatMenuModule
   ],
  providers: [ dataQAservice, dataAccountProfile ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
