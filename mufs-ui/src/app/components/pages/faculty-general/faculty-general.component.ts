import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/shared/models/Project';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-faculty-general',
  templateUrl: './faculty-general.component.html',
  styleUrls: ['./faculty-general.component.scss'],
})
export class FacultyGeneralComponent implements OnInit {
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
      projectsObservable = projectsService.getByFaculty('general');

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