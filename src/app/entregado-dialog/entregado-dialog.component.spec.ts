import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregadoDialogComponent } from './entregado-dialog.component';

describe('EntregadoDialogComponent', () => {
  let component: EntregadoDialogComponent;
  let fixture: ComponentFixture<EntregadoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntregadoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntregadoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
