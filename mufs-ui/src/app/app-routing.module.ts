import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { CreateProjectPageComponent } from './components/pages/create-project-page/create-project-page.component';
import { FacultiesComponent } from './components/pages/faculties/faculties.component';
import { FacultyAutoComponent } from './components/pages/faculty-auto/faculty-auto.component';
import { FacultyEconomyComponent } from './components/pages/faculty-economy/faculty-economy.component';
import { FacultyGeneralComponent } from './components/pages/faculty-general/faculty-general.component';
import { FacultyItComponent } from './components/pages/faculty-it/faculty-it.component';
import { FacultyOilComponent } from './components/pages/faculty-oil/faculty-oil.component';
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
  { path: 'about', component: AboutPageComponent },
  { path: 'faculties', component: FacultiesComponent },
  { path: 'faculty-it', component: FacultyItComponent },
  { path: 'faculty-general', component: FacultyGeneralComponent },
  { path: 'faculty-oil', component: FacultyOilComponent },
  { path: 'faculty-economy', component: FacultyEconomyComponent },
  { path: 'faculty-auto', component: FacultyAutoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
