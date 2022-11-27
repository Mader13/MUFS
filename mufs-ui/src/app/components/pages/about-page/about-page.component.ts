import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProjectsService } from 'src/app/services/projects.service';
@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  amountProjects!: number;
  amountUsers!: Number;
  constructor(
    private userService: UserService,
    private projectsService: ProjectsService
  ) {
    this.projectsService.getAll().subscribe((projects) => {
      this.amountProjects = projects.length;
    });
    this.userService.getAll().subscribe((users) => {
      this.amountUsers = users.length;
    });
  }

  ngOnInit(): void {}
}
