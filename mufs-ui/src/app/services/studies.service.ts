import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  BASE_URL,
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
import { IStudyCreate } from '../shared/interfaces/IStudyCreate';
import { Study } from './../../../../mufs-api/src/models/study.model';

@Injectable({
  providedIn: 'root',
})
export class StudiesService {
  constructor(private http: HttpClient, private toast: ToastrService) {}

  getByCourse(course: string) {
    return this.http.get<Project[]>(PROJECTS_URL + '/' + course);
  }

  getStudiesByID(study: string): Observable<Study> {
    return this.http.get<Study>(BASE_URL + '/api/studies/' + study).pipe(
      tap({
        next: (study) => {},
        error: (errorResponse) => {
          console.log(errorResponse);
        },
      })
    );
  }

  create(createStudy: IStudyCreate): Observable<Study> {
    return this.http
      .post<Study>(BASE_URL + '/api/studies/add', createStudy)
      .pipe(
        tap({
          next: (study: Study) => {
            this.toast.success(`${study.title}`, 'Создан');
          },
          error: (errorResponse) => {
            this.toast.error(
              errorResponse.error,
              'Создание занятия не удалось.'
            );
          },
        })
      );
  }

  addNewParticipant(query: IUserParticipate): Observable<Study> {
    return this.http
      .put<Study>(`${BASE_URL}/api/studies/${query.courseID}/add-user`, query)
      .pipe(
        tap({
          next: (study: Study) => {
            this.toast.success('Участие подтверждено');
          },
          error: (errorResponse) => {
            this.toast.error(
              errorResponse.error,
              'Участие подтверждено неудачно.'
            );
          },
        })
      );
  }
}
