import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_projects } from 'src/data';
import {
  PROJECTS_BY_ID_URL,
  PROJECTS_BY_SEARCH_URL,
  PROJECTS_URL,
} from '../shared/models/constants/urls';
import { Project } from '../shared/models/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(PROJECTS_URL);
  }

  getAllProjectBySearchTerm(searchTerm: string) {
    return this.http.get<Project[]>(PROJECTS_BY_SEARCH_URL + searchTerm);
  }

  getProjectById(idProject: number): Observable<Project> {
    return this.http.get<Project>(PROJECTS_BY_ID_URL + idProject);
  }
}
