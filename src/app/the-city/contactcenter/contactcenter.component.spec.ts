import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactcenterComponent } from './contactcenter.component';

describe('ContactcenterComponent', () => {
  let component: ContactcenterComponent;
  let fixture: ComponentFixture<ContactcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
