import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Insumo } from '../models/insumo';
import { Producto } from '../models/producto';
import { InsumosService } from '../Services/insumos.service';
import { ProductosServicesService } from '../Services/productos-services.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-add-insumo-producto',
  templateUrl: './add-insumo-producto.component.html',
  styleUrls: ['./add-insumo-producto.component.css']
})
export class AddInsumoProductoComponent implements OnInit {
  productoId: number = 0;
  insumoProducto: any[] = [];
  insumos: Insumo[] = [];
  resultado = new MatTableDataSource<Insumo>([]);
  selectedInsumo: Insumo | null = null;
  cantidad: number = 0;
  displayedColumns: string[] = ['nombre', 'unidad', 'cantidad', 'agregar'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productosService: ProductosServicesService,
              private insumosService: InsumosService,
              private snackbar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productoId = params['id'];
      this.cargarDatosProducto();
    });
  }

  ngAfterViewInit() {
    this.resultado.paginator = this.paginator;
  }

  cargarDatosProducto(): void {
    this.productosService.getProductoById(this.productoId).subscribe({
      next: (data: Producto) => {
        this.insumoProducto = data.insumos || [];
        this.cargarInsumos();
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al cargar insumos de producto', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cargarInsumos(): void {
    this.insumosService.getInsumos().subscribe({
      next: (data: Insumo[]) => {
        // Filtrar los insumos que no están en this.insumoProducto
        this.resultado.data = data.filter(insumo =>
          !this.insumoProducto.some(ip => ip.id == insumo.id)
        );
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al cargar los insumos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyUserFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.resultado.filter = filterValue.trim().toLowerCase();

    if (this.resultado.paginator) {
      this.resultado.paginator.firstPage();
    }
  }

  agregarInsumo(insumo: any) {
    if (!insumo || insumo.cantidad <= 0 || insumo.cantidad == null || insumo.cantidad == undefined) {
      this.snackbar.open('Selecciona un insumo y especifica la cantidad', 'Cerrar', { duration: 3000 });
      return;
    }

    const nuevoInsumo = {
      insumoId: Number(insumo.id),
      cantidad: insumo.cantidad
    };

    this.productosService.addInsumoToProduct(this.productoId, nuevoInsumo.insumoId, nuevoInsumo.cantidad).subscribe({
      next: (data) => {
        this.snackbar.open('Insumo agregado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/insumoProducto', this.productoId]);
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open('Error al agregar insumo', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
