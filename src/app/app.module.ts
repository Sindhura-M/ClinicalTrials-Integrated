import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { Step3 } from './step3.component';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './login/index.component';
import { CreateAccountComponent } from './login/createAccount.component';
import { AccountSuccessComponent } from './login/accountSuccess.component';

import { AnswerQuestionsComponent } from './answerQuestions/answerQuestions.component';
import { HomeComponent } from './home.component';
import { BreastCancerComponent } from './breastCancer/breastCancer.component';
import { CreateProfileComponent } from './profile/createProfile.component';

const appRoutes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'createProfile', component: LoginComponent },
   { path: 'answerQuestions', component: AnswerQuestionsComponent },
   { path: 'home', component: HomeComponent},
   { path: 'breastCancer', component: BreastCancerComponent}
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
    MatExpansionModule
  ],
  declarations: [ 
  HomeComponent,
	AppComponent,
	QuizComponent, 
	HeaderComponent, 
	FooterComponent,
	Step3,
  IndexComponent, 
	CreateAccountComponent,
  AccountSuccessComponent,
	LoginComponent, 
  AnswerQuestionsComponent,
  BreastCancerComponent,
  CreateProfileComponent
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
