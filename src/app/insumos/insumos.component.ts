import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Insumo } from '../models/insumo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsumosService } from '../Services/insumos.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarInsumoComponent } from '../editar-insumo/editar-insumo.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.css'
})
export class InsumosComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'unidad', 'acciones'];

  constructor(private insumosService: InsumosService, private snackbar: MatSnackBar, public modal: MatDialog) {}
 
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  insumos: Insumo[] = [];
  dataSource!: MatTableDataSource<Insumo>;
  filtroNombre: string = '';

  customFilter(): (data: Insumo, filter: string) => boolean {
    const filterFunction = (data: Insumo, filter: string): boolean => {
      return data.nombre.toLowerCase().includes(filter.toLowerCase());
    }
    return filterFunction;
  }

  getInsumos(): void {
    this.insumosService.getInsumos().subscribe({
      next: (data: Insumo[]) => {
          this.insumos = data;
          this.dataSource = new MatTableDataSource<Insumo>(this.insumos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = this.customFilter();
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

  applyFilter() {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = this.filtroNombre.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
