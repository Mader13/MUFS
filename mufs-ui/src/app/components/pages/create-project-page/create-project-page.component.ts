import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';
import { IProjectCreate } from 'src/app/shared/interfaces/IProjectCreate';
import { PROJECTS_BY_ID_URL } from 'src/app/shared/models/constants/urls';
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
    description: new FormControl(Validators.required, Validators.minLength(50)),
    faculty: new FormControl(Validators.required),
  });
  isSubmitted = false;

  get fc() {
    return this.createProjectForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private projectsService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.project = new Project();
  }

  ngOnInit(): void {
    this.createProjectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      faculty: ['', [Validators.required]],
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
      faculty: formValues.faculty,
      leader: userID.id,
    };
    this.projectsService.create(project).subscribe((res) => {
      this.Project = res;
      this.userService
        .addUserToProject(userID.id, this.Project.id.toString())
        .subscribe((_) => {});
      this.router.navigateByUrl(`/projects/${this.Project.id}`);
    });
  }
}
