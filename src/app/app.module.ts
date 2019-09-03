import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutCTCComponent } from './about/about.component';
import { StepperComponent } from './stepper/stepper.component';

const appRoutes: Routes = [
   { path: 'login', component: StepperComponent },
   { path: 'welcome', component: WelcomeComponent },
   { path: 'answerQuestions', component: AnswerQuestionsComponent },
   { path: 'home', component: HomeComponent},
   { path: 'breastCancer', component: BreastCancerComponent},
   { path: 'about', component: AboutCTCComponent},
   { path: '', redirectTo: '/login', pathMatch: 'full'},
   { path: '**', component: StepperComponent }
];

@NgModule({
  imports:      [ 
  	BrowserModule, 
  	FormsModule, 
  	RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule
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
  StepperComponent
  ],
  exports: [
     MatStepperModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatInputModule,
     MatRadioModule,
     MatSelectModule,
     MatTabsModule,
     MatExpansionModule
   ],
  providers: [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
