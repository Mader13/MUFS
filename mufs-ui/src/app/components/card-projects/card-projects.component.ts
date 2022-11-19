import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/shared/models/Project';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

@Component({
  selector: 'app-card-projects',
  templateUrl: './card-projects.component.html',
  styleUrls: ['./card-projects.component.scss'],
})
export class CardProjectsComponent implements OnInit {
  projects: Project[] = [];
  sliceProjects: Project[] = [];
  public amountProjects!: number;
  public isThereProjects!: boolean;
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

        this.amountProjects = this.projects.length;
        this.sliceProjects = this.projects.slice(0, 5);
        console.log(this.amountProjects);
        if (this.amountProjects != 0) {
          this.isThereProjects = true;
        } else {
          this.isThereProjects = false;
        }
      });
    });
  }

  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex + event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.projects.length) {
      endIndex = this.projects.length;
    }
    this.sliceProjects = this.projects.slice(startIndex, endIndex);
  }

  ngOnInit(): void {}
}
