import { Component } from '@angular/core';
import { ProductosServicesService } from '../Services/productos-services.service';
import { Insumo } from '../models/insumo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsumosService } from '../Services/insumos.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarInsumoComponent } from '../editar-insumo/editar-insumo.component';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.css'
})
export class InsumosComponent {

  displayedColumns: string[] = ['nombre', 'unidad', 'acciones'];

  constructor(private insumosService: InsumosService, private snackbar: MatSnackBar, public modal: MatDialog) {}

  insumos: Insumo[] = [];
  filtroNombre: string = '';

  getInsumos(): void {
    this.insumosService.getInsumos().subscribe({
      next: (data: Insumo[]) => {
          this.insumos = data;
          this.snackbar.open('Insumos Cargados', 'Cerrar' ,
            {duration: 3000}
          );
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al cargar insumos', 'Cerrar',
           {duration: 3000}
        );
      }
    })
  }

  deleteInsumo(id: number): void {
    this.insumosService.deleteInsumo(id).subscribe({
      next: (data) => {
        const deletedInsumo = data[0];
        const deletedInsumoIndex = this.insumos.findIndex(i => i.id == deletedInsumo.id);
        this.insumos.splice(deletedInsumoIndex, 1);
        this.insumos = [...this.insumos];
        this.snackbar.open('Insumo Eliminado', 'Cerrar', 
          {duration: 3000}
        )
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al borrar insumo', 'Cerrar', 
          {duration: 300}
        )
      }
    });
  }

  ngOnInit(): void {
    this.getInsumos();
  }

  openEditModal(insumo: any): void {
    const modal = this.modal.open(EditarInsumoComponent, {
      width: '300px',
      data: insumo,
    });  

    modal.afterClosed().subscribe(res => {
      this.getInsumos();
    }
    )
  }

  filtrarInsumos(insumos: Insumo[], filtroNombre: string): Insumo[] {
    if (!filtroNombre) {
      return insumos;
    }
    return insumos.filter(insumo => {
      insumo.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    })
  }
}
