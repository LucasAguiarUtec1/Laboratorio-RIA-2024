import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductoInsumo } from '../models/producto-insumo';
import { InsumosService } from '../Services/insumos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductosServicesService } from '../Services/productos-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../models/producto';
import { Insumo } from '../models/insumo';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../Services/auth-service.service';

@Component({
  selector: 'app-insumos-producto',
  templateUrl: './insumos-producto.component.html',
  styleUrls: ['./insumos-producto.component.css']
})
export class InsumosProductoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['insumo', 'cantidad', 'actions'];

  productoId: number = 0;

  public productoNombre: string = "";

  filtroNombre: string = '';

  insumoProducto: any[] = [];

  resultado: any[] = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(
    private insumosServices: InsumosService,
    private productosService: ProductosServicesService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productoId = params['id'];
      this.productosService.getProductoById(this.productoId).subscribe({
        next: (data: Producto) => {
          this.productoNombre = data.nombre;
          this.insumoProducto = data.insumos || [];
          this.cargarInsumos();
        },
        error: (error) => {
          console.log(error);
          this.snackbar.open('Error al obtener producto', 'Cerrar', { duration: 3000 });
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.customFilter();
  }

  cargarInsumos(): void {
    this.insumosServices.getInsumos().subscribe({
      next: (data: Insumo[]) => {
        this.resultado = this.insumoProducto.map(ip => {
          const insumo = data.find(i => i.id == ip.id);
          if (insumo) {
            return {
              ...insumo,
              cantidad: ip.cantidad
            };
          }
          return null;
        }).filter(i => i !== null);
        this.dataSource.data = this.resultado;
        console.log(this.resultado);
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al cargar los insumos del producto', 'Cerrar', { duration: 3000 });
      }
    });
  }

  customFilter(): (data: any, filter: string) => boolean {
    return (data: any, filter: string): boolean => {
      return data.nombre.toLowerCase().includes(filter.toLowerCase());
    };
  }

  deleteInsumo(insumoId: number) {
    this.productosService.deleteInsumoFromProducto(this.productoId, insumoId).subscribe({
      next: (data) => {
        const insumoIndex = this.resultado.findIndex(r => r.id === insumoId);
        if (insumoIndex !== -1) {
          this.resultado.splice(insumoIndex, 1);
          this.dataSource.data = this.resultado.slice();
        }
        this.snackbar.open('Insumo eliminado correctamente', 'Cerrar', { duration: 3000 });
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al eliminar insumo', 'Cerrar', { duration: 3000 });
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

  addInsumo() {
    this.router.navigate(['/addInsumoProducto', this.productoId]);
  }
}
