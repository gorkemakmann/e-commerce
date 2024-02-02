import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCellComponent } from './product-cell.component';

describe('ProductCellComponent', () => {
  let component: ProductCellComponent;
  let fixture: ComponentFixture<ProductCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCellComponent]
    });
    fixture = TestBed.createComponent(ProductCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
