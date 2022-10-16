import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/models/Project';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-card-projects',
  templateUrl: './card-projects.component.html',
  styleUrls: ['./card-projects.component.scss'],
})
export class CardProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectsService: ProjectsService,
    activatedRoute: ActivatedRoute
  ) {
    let projectsObservable: Observable<Project[]>;
    activatedRoute.params.subscribe((params: any) => {
      if (params.searchTerm)
        projectsObservable = this.projectsService.getAllProjectBySearchTerm(
          params.searchTerm
        );
      else projectsObservable = projectsService.getAll();

      projectsObservable.subscribe((serverProjects) => {
        this.projects = serverProjects;
      });
    });
  }

  ngOnInit(): void {}
}
