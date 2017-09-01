import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './partials/footer/footer.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';
import { NavbarComponent } from './partials/navbar/navbar.component';

import { customHttpProvider } from './services/custom-http.service';
import { SignupService } from './services/signup.service';
import { UserService } from './services/user.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '*', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    FooterComponent,
    SignupFormComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [customHttpProvider, SignupService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
