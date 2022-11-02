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
import { User } from 'src/app/shared/models/User';
@Component({
  selector: 'app-create-project-page',
  templateUrl: './create-project-page.component.html',
  styleUrls: ['./create-project-page.component.scss'],
})
export class CreateProjectPageComponent implements OnInit {
  user!: User;

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
  ) {}

  ngOnInit(): void {
    this.createProjectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(100)]],
    });
  }

  submitCreation() {
    console.log('SubmitCreation');
    this.isSubmitted = true;
    if (this.createProjectForm.invalid) return;
    const formValues = this.createProjectForm.value;
    const project: IProjectCreate = {
      title: formValues.title,
      description: formValues.description,
      leader: 'empty',
    };
    this.projectsService.create(project);
  }

  get getID() {
    return this.user.id;
  }
}
