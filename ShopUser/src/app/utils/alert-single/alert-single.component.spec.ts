import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSingleComponent } from './alert-single.component';

describe('AlertSingleComponent', () => {
  let component: AlertSingleComponent;
  let fixture: ComponentFixture<AlertSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
