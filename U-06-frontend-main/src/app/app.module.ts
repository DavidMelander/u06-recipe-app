import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './public/register/register.component';
import { LoginComponent } from './public/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicService } from './public/public.service';
import { LogoutComponent } from './public/logout/logout.component';


@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, LogoutComponent],
  imports: [BrowserModule, AppRoutingModule, PublicModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [PublicService],
  bootstrap: [AppComponent],
})
export class AppModule {}
