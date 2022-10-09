import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss'],
})
export class ListProjectsComponent implements OnInit {
  public projects: any = [];

  constructor(private _projectsService: ProjectsService) {}

  ngOnInit(): void {
    this._projectsService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
}
