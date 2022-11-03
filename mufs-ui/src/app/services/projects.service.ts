import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { sample_projects } from 'src/data';
import {
  PROJECTS_BY_ID_URL,
  PROJECTS_BY_SEARCH_URL,
  PROJECTS_CREATE_URL,
  PROJECTS_URL,
} from '../shared/models/constants/urls';
import { Project } from '../shared/models/Project';
import { IProjectCreate } from '../shared/interfaces/IProjectCreate';
import { ToastrService } from 'ngx-toastr';

const PROJECT_KEY = 'Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  public projectObservable: Observable<Project>;
  private projectSubject = new BehaviorSubject<Project>(
    this.getProjectFromLocalStorage()
  );

  constructor(private http: HttpClient, private toast: ToastrService) {
    this.projectObservable = this.projectSubject.asObservable();
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(PROJECTS_URL);
  }

  getAllProjectBySearchTerm(searchTerm: string) {
    return this.http.get<Project[]>(PROJECTS_BY_SEARCH_URL + searchTerm);
  }

  getProjectById(idProject: number): Observable<Project> {
    return this.http.get<Project>(PROJECTS_BY_ID_URL + idProject);
  }



  create(createProject: IProjectCreate): Observable<Project> {
    return this.http.post<Project>(PROJECTS_CREATE_URL, createProject).pipe(
      tap({
        next: (project: Project) => {
          this.projectSubject.next(project);
          this.toast.success(`${project.title}`, 'Создан');
        },
        error: (errorResponse) => {
          this.toast.error(
            errorResponse.error,
            'Регистрация не удалась, попробуйте снова.'
          );
        },
      })
    );
  }

  private getProjectFromLocalStorage(): Project {
    const projectJson = localStorage.getItem(PROJECT_KEY);
    if (projectJson) return JSON.parse(projectJson) as Project;
    return new Project();
  }
}
