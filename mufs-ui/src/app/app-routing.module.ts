import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { CreateProjectPageComponent } from './components/pages/create-project-page/create-project-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { ProjectPageComponent } from './components/pages/project-page/project-page.component';
import { RegisterUserPageComponent } from './components/pages/register-user-page/register-user-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'projects/:id', component: ProjectPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register-user', component: RegisterUserPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'create-project', component: CreateProjectPageComponent },
  { path: 'about', component: AboutPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
