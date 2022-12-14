import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';
import { IUserProjects } from './../../../shared/interfaces/IUserProjects';
import { query } from '@angular/animations';
import { IUserAddToProjectDecision } from 'src/app/shared/interfaces/IUserAddToProjectDecision';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user!: User;
  projects: Project[] = [];

  constructor(
    private userService: UserService,
    private projectsService: ProjectsService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  async refreshUser() {
    this.userService.refreshUserInfo(this.user.id).subscribe((freshUser) => {
      this.user = freshUser;
      this.getUserProjects();
    });
  }
  async getUserProjects() {
    this.user.idProject.forEach((project) => {
      this.projectsService
        .getProjectsByIdUser(project)
        .subscribe((serverProject) => {
          this.projects.push(serverProject);
        });
    });
  }
  async deleteAccount(idUser: string) {
    console.log(this.user.idProject, 'Пользовательские проекты');
    this.user.idProject.forEach((pid) => {
      console.log(pid, 'Айди проекта');
      this.projectsService
        .excludeUserFromProject(idUser, pid)
        .subscribe((_) => {
          console.log('Пользователь убран из проекта');
        });
      const query: IUserAddToProjectDecision = {
        idUser: idUser,
        idProject: pid,
        decision: false,
      };
      console.log(query, 'Запрос');
      this.projectsService.decideAddingNewMember(query).subscribe((_) => {});
    });

    this.userService.deleteUser(idUser).subscribe((_) => {
      console.log('Account deleted');
    });
  }
  ngOnInit(): void {
    this.refreshUser();
  }
}
