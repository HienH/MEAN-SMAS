import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatSnackBarModule } from '@angular/material'
import { AuthGuardService } from './guards/auth-guard.service';
import { UserService } from './shared/user.service';

@NgModule({
    declarations: [
        AppComponent,
        routingComponents,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        HttpClientModule,


    ],
    providers: [AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule { }
