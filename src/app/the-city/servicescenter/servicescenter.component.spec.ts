import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicescenterComponent } from './servicescenter.component';

describe('ServicescenterComponent', () => {
  let component: ServicescenterComponent;
  let fixture: ComponentFixture<ServicescenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicescenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicescenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
