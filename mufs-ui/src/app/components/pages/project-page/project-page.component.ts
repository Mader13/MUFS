import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  project!: Project;
  constructor(
    activatedRoute: ActivatedRoute,
    projectsService: ProjectsService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        projectsService.getProjectById(params.id).subscribe((serverProject) => {
          this.project = serverProject;
        });
    });
  }

  ngOnInit(): void {}
}
