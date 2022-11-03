import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../app/shared/models/User';
import { Project } from '../app/shared/models/Project';


import { CardProjectsComponent } from './components/card-projects/card-projects.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mufs-ui';




}
