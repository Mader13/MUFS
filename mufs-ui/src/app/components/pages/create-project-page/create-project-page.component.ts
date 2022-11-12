import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';
import { IProjectCreate } from 'src/app/shared/interfaces/IProjectCreate';
import { Project } from 'src/app/shared/models/Project';
import { User } from 'src/app/shared/models/User';
@Component({
  selector: 'app-create-project-page',
  templateUrl: './create-project-page.component.html',
  styleUrls: ['./create-project-page.component.scss'],
})
export class CreateProjectPageComponent implements OnInit {
  user!: User;
  Project!: Project;
  public project: Project;
  createProjectForm: FormGroup = new FormGroup({
    title: new FormControl(Validators.required),
    description: new FormControl(
      Validators.required,
      Validators.minLength(100)
    ),
  });
  isSubmitted = false;

  get fc() {
    return this.createProjectForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private projectsService: ProjectsService
  ) {
    this.project = new Project();
  }

  ngOnInit(): void {
    this.createProjectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(100)]],
    });
  }

  submitCreation() {
    this.isSubmitted = true;
    if (this.createProjectForm.invalid) return;
    const formValues = this.createProjectForm.value;
    const userID = JSON.parse(localStorage.User);
    const project: IProjectCreate = {
      title: formValues.title,
      description: formValues.description,
      leader: userID.id,
    };
    this.projectsService.create(project).subscribe((res) => {
      this.Project = res;

      this.userService
        .addUserToProject(userID.id, this.Project.id.toString())
        .subscribe((_) => {});
    });
  }
}
