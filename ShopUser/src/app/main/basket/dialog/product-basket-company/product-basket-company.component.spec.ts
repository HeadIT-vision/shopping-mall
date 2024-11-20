import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBasketCompanyComponent } from './product-basket-company.component';

describe('ProductBasketCompanyComponent', () => {
  let component: ProductBasketCompanyComponent;
  let fixture: ComponentFixture<ProductBasketCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductBasketCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductBasketCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
