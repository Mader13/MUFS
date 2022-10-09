import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardContainerComponent } from './user-card-container.component';

describe('UserCardContainerComponent', () => {
  let component: UserCardContainerComponent;
  let fixture: ComponentFixture<UserCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
