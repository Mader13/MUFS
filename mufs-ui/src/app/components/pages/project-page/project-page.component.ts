import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { IUserParticipate } from 'src/app/shared/interfaces/IUserParticipate';
@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  project!: Project;
  user!: User;
  members!: string[];
  pendingMembers!: string[];
  idLeader!: string;
  currentProject!: string;
  participateStatus!: number;
  //leaderName: string;
  constructor(
    activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private userService: UserService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        projectsService.getProjectById(params.id).subscribe((serverProject) => {
          this.project = serverProject;
          this.members = this.project.members;
          this.pendingMembers = this.project.pendingMembers;
          this.idLeader = this.project.leader.toString();
          this.currentProject = this.project.id.toString();
          this.checkUserParticipation();
        });
    });
    console.log('Участие ' + this.participateStatus);
    //this.leaderName = this.getLeaderName();
  }

  participateInProject() {
    const userInfo = JSON.parse(localStorage.User);
    const query: IUserParticipate = {
      idProject: this.currentProject,
      idUser: userInfo.id,
    };
    console.log(query);
    this.projectsService.addNewParticipant(query).subscribe((_) => {});
    this.participateStatus = 2;
  }

  async checkUserParticipation() {
    const userInfo = await JSON.parse(localStorage.User);
    const id = userInfo.id;

    if (this.project.members.includes(id)) {
      this.participateStatus = 1;
      return this.participateStatus;
    }
    if (this.project.pendingMembers.includes(id)) {
      this.participateStatus = 2;
      return this.participateStatus;
    }
    this.participateStatus = 3;
    return this.participateStatus;
  }

  getLeaderName() {
    try {
      const leaderName = this.userService
        .getUserByID(this.idLeader)
        .subscribe((user) => (this.user.name = user.name));
      return leaderName;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  ngOnInit(): void {}
}
