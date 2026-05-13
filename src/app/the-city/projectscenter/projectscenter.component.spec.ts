import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectscenterComponent } from './projectscenter.component';

describe('ProjectscenterComponent', () => {
  let component: ProjectscenterComponent;
  let fixture: ComponentFixture<ProjectscenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectscenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectscenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
