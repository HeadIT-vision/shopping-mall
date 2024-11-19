import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConsultingComponent } from './product-consulting.component';

describe('ProductConsultingComponent', () => {
  let component: ProductConsultingComponent;
  let fixture: ComponentFixture<ProductConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductConsultingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
