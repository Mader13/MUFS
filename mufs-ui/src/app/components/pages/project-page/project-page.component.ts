import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { IUserParticipate } from 'src/app/shared/interfaces/IUserParticipate';
import { IUserAddToProjectDecision } from 'src/app/shared/interfaces/IUserAddToProjectDecision';
import { resolve } from 'path';
@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  project!: Project;
  user?: User;
  userProject?: User;
  members!: string[];
  pendingMembers!: string[];
  public pMember: Array<User> = [];
  public projMember: Array<User> = [];
  idLeader!: string;
  currentProject!: string;
  participateStatus!: number;
  leaderName!: string;
  userInfo!: User;
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
          this.getLeaderInfo();
          this.getPendingMembersInfo(this.project.pendingMembers);
          this.getMembersInfo(this.members);
        });
    });
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
    this.userInfo = await JSON.parse(localStorage.User);
    const id = this.userInfo.id;

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

  getLeaderInfo() {
    this.userService.getUserByID(this.idLeader).subscribe((serverUser) => {
      this.userProject = serverUser;
    });
  }

  getPendingMembersInfo(pMemberIDs: string[]) {
    for (let pMemberID of pMemberIDs) {
      this.userService.getUserByID(pMemberID).subscribe((serverUser) => {
        this.pMember.push(serverUser);
      });
    }
  }
  getMembersInfo(membersID: string[]) {
    for (let memberID of membersID) {
      this.userService.getUserByID(memberID).subscribe((serverUser) => {
        this.projMember.push(serverUser);
      });
    }
  }
  async makeDecisionOnAddingToProject(
    pMemberID: string,
    decision: boolean,
    idProject: string
  ) {
    const query: IUserAddToProjectDecision = {
      idUser: pMemberID,
      idProject: idProject,
      decision: decision,
    };
    console.log(query, 'Запрос внутри makeDecision');
    this.pMember.forEach((pm, index) => {
      if (pm.id == pMemberID) {
        this.pMember.splice(index, 1);
      }
    });
    if (decision) {
      this.project.members.push(pMemberID);
      this.projectsService.decideAddingNewMember(query).subscribe((_) => {});
      this.userService
        .addUserToProject(pMemberID, idProject)
        .subscribe((user) => {
          console.log(user, 'результат выполнения');
        });
    } else {
      this.projectsService.decideAddingNewMember(query).subscribe((_) => {});
    }
  }

  ngOnInit(): void {}
}
