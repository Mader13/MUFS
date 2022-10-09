import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private baseUrl: string = 'http://localhost:3000/project';

  constructor(private _httpClient: HttpClient) {}

  getProjects() {
    return this._httpClient.get(this.baseUrl);
  }
}
