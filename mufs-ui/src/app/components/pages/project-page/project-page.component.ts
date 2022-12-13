import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { IUserParticipate } from 'src/app/shared/interfaces/IUserParticipate';
import { IUserAddToProjectDecision } from 'src/app/shared/interfaces/IUserAddToProjectDecision';
import { resolve } from 'path';
import { StudiesService } from './../../../services/studies.service';
import { Study } from 'src/app/shared/models/Study';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IStudyCreate } from 'src/app/shared/interfaces/IStudyCreate';
import { IStudyAdd } from 'src/app/shared/interfaces/IStudyAdd';
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
  studiesID!: string[];
  studyMembers!: string[];
  public pMember: Array<User> = [];
  public projMember: Array<User> = [];
  public sMember: Array<User> = [];
  public studiesInfo: Array<Study> = [];

  createStudyForm: FormGroup = new FormGroup({
    title: new FormControl(Validators.required),
    description: new FormControl(Validators.required),
    date: new FormControl(Validators.required),
  });
  isSubmitted = false;

  idLeader!: string;
  currentProject!: string;
  participateStatus!: number;
  leaderName!: string;
  userInfo!: User;

  public study: Study;

  constructor(
    activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private userService: UserService,
    private studiesService: StudiesService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.study = new Study();
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        projectsService.getProjectById(params.id).subscribe((serverProject) => {
          console.log(serverProject);
          this.project = serverProject;
          this.members = this.project.members;
          // this.pendingMembers = this.project.pendingMembers;
          this.idLeader = this.project.leader.toString();
          this.currentProject = this.project.id.toString();
          this.studiesID = this.project.studies;
          // this.checkUserParticipation();
          this.getLeaderInfo();
          // this.getPendingMembersInfo(this.project.pendingMembers);
          this.getMembersInfo(this.members);
          this.getStudiesInfo(this.studiesID);
        });
    });
  }
  get fc() {
    return this.createStudyForm.controls;
  }
  participateInProject(course: string) {
    const userInfo = JSON.parse(localStorage.User);
    const query: IUserParticipate = {
      courseID: course,
      idUser: userInfo.id,
    };
    console.log(query);
    this.studiesService.addNewParticipant(query).subscribe((_) => {});
    this.participateStatus = 2;
    this.userService.addUserToProject(userInfo.id, course).subscribe((_) => {});
  }

  async checkUserParticipation() {
    this.userInfo = await JSON.parse(localStorage.User);
    const id = this.userInfo.id;

    if (this.project.members.includes(id)) {
      this.participateStatus = 2;
      return this.participateStatus;
    }
    if (this.project.pendingMembers.includes(id)) {
      this.participateStatus = 2;
      return this.participateStatus;
    }
    this.participateStatus = 1;
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

  checkUserForStudy(studyMembers: string[]): boolean {
    this.userInfo = JSON.parse(localStorage.User);
    if (studyMembers.includes(this.userInfo.id)) {
      return false;
    }
    return true;
  }

  getStudiesInfo(studies: string[]) {
    for (let study of studies) {
      this.studiesService.getStudiesByID(study).subscribe((serverStudy) => {
        serverStudy.members.forEach((member) => {
          this.userService.getUserByID(member).subscribe((serverUser) => {
            this.sMember.push(serverUser);
          });
        });

        this.studiesInfo.push(serverStudy);
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
        .subscribe((user) => {});
    } else {
      this.projectsService.decideAddingNewMember(query).subscribe((_) => {});
    }
  }

  submitCreation() {
    this.isSubmitted = true;
    if (this.createStudyForm.invalid) return;
    const formValues = this.createStudyForm.value;

    const userID = JSON.parse(localStorage.User);
    const study: IStudyCreate = {
      title: formValues.title,
      description: formValues.description,
      course: this.project.id,
      leader: this.project.leader.toString(),
      date: formValues.date,
    };
    console.log(study);

    this.studiesService.create(study).subscribe((serverStudy) => {
      const sQ: IStudyAdd = {
        course: this.project.id,
        study: serverStudy.id,
      };
      this.projectsService.addStudy(sQ).subscribe((_) => {});
    });
  }

  ngOnInit(): void {
    this.createStudyForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      date: ['', [Validators.required]],
    });
  }
}
