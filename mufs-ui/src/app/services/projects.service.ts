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
import { IUserAddToProjectDecision } from '../shared/interfaces/IUserAddToProjectDecision';
import { IUserProjects } from '../shared/interfaces/IUserProjects';

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

  getProjectsByIdUser(idProject: string): Observable<Project> {
    return this.http.get<Project>(
      PROJECTS_BY_ID_URL + idProject + '/userSearch'
    );
  }

  countProjects(): Observable<Project> {
    return this.http.get<Project>(PROJECTS_URL + '/count');
  }

  deleteProjectByID(idProject: string): Observable<Project> {
    return this.http.delete<Project>(PROJECTS_BY_ID_URL + idProject).pipe(
      tap({
        next: (project: Project) => {
          this.toast.info('Проект удален');
        },
        error: (errorResponse) => {
          this.toast.error(errorResponse.error, 'Удаление неудачно.');
        },
      })
    );
  }

  addNewParticipant(query: IUserParticipate): Observable<Project> {
    return this.http
      .put<Project>(PROJECTS_BY_ID_URL + query.idProject + '/add', query)
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

  excludeUserFromProject(
    userID: string,
    projectID: string
  ): Observable<Project> {
    let idUserjsonStr = `{ "userID": "${userID}" }`;
    let idUserjson = JSON.parse(idUserjsonStr);
    return this.http
      .put<Project>(PROJECTS_BY_ID_URL + projectID + '/deleteUser', idUserjson)
      .pipe(
        tap({
          next: (project: Project) => {
            this.toast.info('Пользователь удален из проекта');
          },
          error: (errorResponse) => {
            this.toast.error(errorResponse.error, 'Удаление неудачно.');
          },
        })
      );
  }

  decideAddingNewMember(query: IUserAddToProjectDecision): Observable<Project> {
    return this.http
      .put<Project>(PROJECTS_BY_ID_URL + query.idProject + '/decide', query)
      .pipe(
        tap({
          next: (project: Project) => {
            if (query.decision) {
              this.toast.success('Пользователь добавлен в проект');
            } else {
              this.toast.info('Пользователю отказано в участии');
            }
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
