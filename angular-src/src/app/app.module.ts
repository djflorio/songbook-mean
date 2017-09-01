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
import { UserService } from './services/user.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
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
    NavbarComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [customHttpProvider, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
