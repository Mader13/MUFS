import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  PROJECTS_BY_ID_URL,
  PROJECTS_BY_SEARCH_URL,
  PROJECTS_CREATE_URL,
  PROJECTS_URL,
} from '../shared/models/constants/urls';
import { Project } from '../shared/models/Project';
import { IProjectCreate } from '../shared/interfaces/IProjectCreate';
import { ToastrService } from 'ngx-toastr';
import { IUserParticipate } from '../shared/interfaces/IUserParticipate';

const PROJECT_KEY = 'Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient, private toast: ToastrService) {}

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(PROJECTS_URL);
  }

  getAllProjectBySearchTerm(searchTerm: string) {
    return this.http.get<Project[]>(PROJECTS_BY_SEARCH_URL + searchTerm);
  }

  getProjectById(idProject: number): Observable<Project> {
    return this.http.get<Project>(PROJECTS_BY_ID_URL + idProject);
  }

  // getProjectsByLeader(leader: string): Observable<Project[]> {
  //   return this.http.get<Project[]>(PROJECTS_URL, leader);
  // }

  addNewParticipant(query: IUserParticipate): Observable<Project> {
    return this.http
      .put<Project>(PROJECTS_BY_ID_URL + query.idProject, query)
      .pipe(
        tap({
          next: (project: Project) => {
            this.toast.success('Отправлена заявка на участие в проекте');
          },
          error: (errorResponse) => {
            this.toast.error(errorResponse.error, 'Добавление неудачно.');
          },
        })
      );
  }

  create(createProject: IProjectCreate): Observable<Project> {
    return this.http.post<Project>(PROJECTS_CREATE_URL, createProject).pipe(
      tap({
        next: (project: Project) => {
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
