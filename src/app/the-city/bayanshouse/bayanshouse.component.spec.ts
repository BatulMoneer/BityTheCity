import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BayanshouseComponent } from './bayanshouse.component';

describe('BayanshouseComponent', () => {
  let component: BayanshouseComponent;
  let fixture: ComponentFixture<BayanshouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BayanshouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BayanshouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
