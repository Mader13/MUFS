import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardContainerComponent } from './project-card-container.component';

describe('ProjectCardContainerComponent', () => {
  let component: ProjectCardContainerComponent;
  let fixture: ComponentFixture<ProjectCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCardContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
