import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import {
  USER_BY_ID_URL,
  USER_LOGIN_URL,
  USER_REGISTER_URL,
} from '../shared/models/constants/urls';
import { User } from '../shared/models/User';
import { IUserRegister } from './../shared/interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Добро пожаловать, ${user.name}!`,
            'Авторизация успешна'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error,
            'Авторизация прошла неуспешно'
          );
        },
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Добро пожаловать на сайт открытых проектов, ${user.name}.`,
            'Регистрация прошла успешно.'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error,
            'Регистрация не удалась, попробуйте снова.'
          );
        },
      })
    );
  }

  refreshUserInfo(idUser: string): Observable<User> {
    return this.http.get<User>(USER_BY_ID_URL + idUser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.userObservable = this.userSubject.asObservable();
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error,
            'Ошибка обновления информации'
          );
        },
      })
    );
  }

  changePassword() {}

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/');
  }

  addUserToProject(idUser: string, idP: string): Observable<User> {
    let idPjsonStr = `{ "idP": "${idP}" }`;
    let idPjson = JSON.parse(idPjsonStr);

    return this.http.put<User>(USER_BY_ID_URL + idUser, idPjson).pipe(
      tap({
        next: (User) => {
          console.log(idPjson, 'Проекты пользователя');
        },
        error: (errorResponse) => {
          console.log(errorResponse);
        },
      })
    );
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  getUserByID(idUser: string): Observable<User> {
    return this.http.get<User>(USER_BY_ID_URL + idUser).pipe(
      tap({
        next: (user) => {},
        error: (errorResponse) => {
          console.log(errorResponse);
        },
      })
    );
  }
}
