import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchTerm = '';

  user!: User;
  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) this.searchTerm = params.searchTerm;
    });

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
  }

  get getEmail() {
    return this.user.email;
  }

  search(term: string): void {
    if (term) this.router.navigateByUrl('/search/' + term);
  }
}
