import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Insumo } from '../models/insumo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InsumosService } from '../Services/insumos.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarInsumoComponent } from '../editar-insumo/editar-insumo.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../Services/auth-service.service';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'unidad'];

  constructor(
    private insumosService: InsumosService, 
    private snackbar: MatSnackBar, 
    public modal: MatDialog, 
    public authService: AuthService
  ) {}

  insumos: Insumo[] = [];
  dataSource: MatTableDataSource<Insumo> = new MatTableDataSource<Insumo>([]);
  filtroNombre: string = '';

  ngOnInit(): void {
    this.getInsumos();
    if (this.authService.role === 'ADMIN') {
      this.displayedColumns.push('acciones');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getInsumos(): void {
    this.insumosService.getInsumos().subscribe({
      next: (data: Insumo[]) => {
        this.insumos = data;
        this.dataSource = new MatTableDataSource<Insumo>(this.insumos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.customFilter();
        this.snackbar.open('Insumos Cargados', 'Cerrar', { duration: 3000 });
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al cargar insumos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  deleteInsumo(id: number): void {
    this.insumosService.deleteInsumo(id).subscribe({
      next: (data) => {
        const deletedInsumo = data[0];
        const deletedInsumoIndex = this.insumos.findIndex(i => i.id == deletedInsumo.id);
        this.insumos.splice(deletedInsumoIndex, 1);
        this.dataSource.data = this.insumos;
        this.snackbar.open('Insumo Eliminado', 'Cerrar', { duration: 3000 });
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al borrar insumo', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyFilter() {
    this.dataSource.filter = this.filtroNombre.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customFilter(): (data: Insumo, filter: string) => boolean {
    return (data: Insumo, filter: string): boolean => {
      return data.nombre.toLowerCase().includes(filter.toLowerCase());
    };
  }

  openEditModal(insumo: any): void {
    const modal = this.modal.open(EditarInsumoComponent, {
      data: insumo,
    });  

    modal.afterClosed().subscribe(res => {
      this.getInsumos();
    });
  }

  filtrarInsumos(insumos: Insumo[], filtroNombre: string): Insumo[] {
    if (!filtroNombre) {
      return insumos;
    }
    return insumos.filter(insumo => insumo.nombre.toLowerCase().includes(filtroNombre.toLowerCase()));
  }
}
