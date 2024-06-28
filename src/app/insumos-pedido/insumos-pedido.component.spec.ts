import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosPedidoComponent } from './insumos-pedido.component';

describe('InsumosPedidoComponent', () => {
  let component: InsumosPedidoComponent;
  let fixture: ComponentFixture<InsumosPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsumosPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsumosPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
