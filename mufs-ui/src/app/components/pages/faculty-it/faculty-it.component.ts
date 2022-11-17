import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-faculty-it',
  templateUrl: './faculty-it.component.html',
  styleUrls: ['./faculty-it.component.scss'],
})
export class FacultyItComponent implements OnInit {
  projects: Project[] = [];
  public amountProjects!: number;
  public isThereProjects!: boolean;
  constructor(
    private projectsService: ProjectsService,
    activatedRoute: ActivatedRoute
  ) {
    let projectsObservable: Observable<Project[]>;
    activatedRoute.params.subscribe((params: any) => {
      // if (params.searchTerm)
      //   projectsObservable = this.projectsService.getAllProjectBySearchTerm(
      //     params.searchTerm
      //   );
      projectsObservable = projectsService.getByFaculty('it');

      projectsObservable.subscribe((serverProjects) => {
        this.projects = serverProjects;
        this.amountProjects = this.projects.length;
        console.log(this.amountProjects);
        if (this.amountProjects != 0) {
          this.isThereProjects = true;
        } else {
          this.isThereProjects = false;
        }
      });
    });
  }

  ngOnInit(): void {}
}
