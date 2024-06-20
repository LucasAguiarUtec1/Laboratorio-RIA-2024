import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosProductoComponent } from './insumos-producto.component';

describe('InsumosProductoComponent', () => {
  let component: InsumosProductoComponent;
  let fixture: ComponentFixture<InsumosProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsumosProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsumosProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
