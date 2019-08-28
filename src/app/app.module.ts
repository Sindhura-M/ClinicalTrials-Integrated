import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AnswerQuestionsComponent } from './answerQuestions/answerQuestions.component';


const appRoutes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'createProfile', component: LoginComponent },
   { path: 'answerQuestions', component: AnswerQuestionsComponent }
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
    MatSelectModule
  ],
  declarations: [ 
	AppComponent,
	QuizComponent, 
	HeaderComponent, 
	FooterComponent,
	Step3,
  IndexComponent, 
	CreateAccountComponent, 
	LoginComponent, 
  AnswerQuestionsComponent
  ],
  exports: [
     MatStepperModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatInputModule,
     MatRadioModule,
     MatSelectModule
   ],
  providers: [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
