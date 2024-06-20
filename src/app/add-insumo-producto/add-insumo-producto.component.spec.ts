import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsumoProductoComponent } from './add-insumo-producto.component';

describe('AddInsumoProductoComponent', () => {
  let component: AddInsumoProductoComponent;
  let fixture: ComponentFixture<AddInsumoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddInsumoProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddInsumoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
