import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BayanComponent } from './bayan.component';

describe('BayanComponent', () => {
  let component: BayanComponent;
  let fixture: ComponentFixture<BayanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BayanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BayanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
