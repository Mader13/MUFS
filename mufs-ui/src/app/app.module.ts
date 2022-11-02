import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CardProjectsComponent } from './components/card-projects/card-projects.component';
import { ProjectPageComponent } from './components/pages/project-page/project-page.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterUserPageComponent } from './components/pages/register-user-page/register-user-page.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { CreateProjectPageComponent } from './components/pages/create-project-page/create-project-page.component';
import { BannerComponent } from './components/partials/banner/banner.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CardProjectsComponent,
    ProjectPageComponent,
    NotFoundComponent,
    LoginPageComponent,
    RegisterUserPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    ProfilePageComponent,
    CreateProjectPageComponent,
    BannerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
    NgxNavbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
