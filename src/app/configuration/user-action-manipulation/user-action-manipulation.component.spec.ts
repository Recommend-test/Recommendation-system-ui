import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionManipulationComponent } from './user-action-manipulation.component';

describe('UserActionManipulationComponent', () => {
  let component: UserActionManipulationComponent;
  let fixture: ComponentFixture<UserActionManipulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActionManipulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
