import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';
import { Project } from 'src/app/shared/models/Project';
@Component({
  selector: 'app-pop-up-delete-project',
  templateUrl: './pop-up-delete-project.component.html',
  styleUrls: ['./pop-up-delete-project.component.scss'],
})
export class PopUpDeleteProjectComponent implements OnInit {
  projectID: string;
  projectTitle: string;
  leaderID: string;
  members!: string[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private projectService: ProjectsService,
    private router: Router,
    private userService: UserService
  ) {
    this.projectID = data.id;
    this.projectTitle = data.title;
    this.leaderID = data.leader.toString();
    this.members = data.members;
  }

  deleteProject() {
    this.members.forEach((member) => {
      this.userService
        .deleteProjectFromUser(member, this.projectID)
        .subscribe((_) => {});
    });

    this.projectService.deleteProjectByID(this.projectID).subscribe((_) => {});

    this.router.navigateByUrl(`/`);
  }

  ngOnInit(): void {}
}
