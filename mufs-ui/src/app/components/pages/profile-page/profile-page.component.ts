import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';
import { IUserProjects } from './../../../shared/interfaces/IUserProjects';
import { StudiesService } from 'src/app/services/studies.service';
import { Study } from 'src/app/shared/models/Study';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user!: User;
  projects: Project[] = [];
  studies: Study[] = [];
  constructor(
    private userService: UserService,
    private projectsService: ProjectsService,
    private studiesService: StudiesService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      console.log(this.user);
    });
  }

  async refreshUser() {
    this.userService.refreshUserInfo(this.user.id).subscribe((freshUser) => {
      this.user = freshUser;
      this.getUserProjects();
      this.getUserStudies();
    });
  }
  async getUserProjects() {
    this.user.idProject.forEach((project) => {
      this.projectsService
        .getProjectsByIdUser(project)
        .subscribe((serverProject) => {
          console.log(serverProject);
          this.projects.push(serverProject);
        });
    });
  }

  async getUserStudies() {
    this.user.courses.forEach((study) => {
      this.studiesService.getStudiesByID(study).subscribe((serverstudy) => {
        console.log(serverstudy);
        this.studies.push(serverstudy);
      });
    });
  }

  ngOnInit(): void {
    this.refreshUser();
  }
}
