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
import { SongService } from './services/song.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { AuthenticationService } from './services/authentication.service';
import { LogoutComponent } from './pages/logout/logout.component';
import { SongComponent } from './pages/song/song.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'song/:id', component: SongComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
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
    LoginComponent,
    LoginFormComponent,
    LogoutComponent,
    SongComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    customHttpProvider,
    UserService,
    SongService,
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
