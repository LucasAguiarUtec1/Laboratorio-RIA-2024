import { Component, OnInit, ViewChild } from '@angular/core';
import { Pedido } from '../models/pedido.model';
import { PedidosServiceService } from '../Services/pedidos-service.service';
import { AuthService } from '../Services/auth-service.service';
import { ProductosDialogComponent } from '../productos-dialog/productos-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RangoFechaDialogComponent } from '../rango-fecha-dialog/rango-fecha-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { LabBackendService } from '../Services/lab-backend.service';
import { Usuario } from '../models/usuario';
import { EntregadoDialogComponent } from '../entregado-dialog/entregado-dialog.component'; // Ruta al componente del popup
import { Router } from '@angular/router';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  pedidos: MatTableDataSource<Pedido>;
  pedidosFiltrados: Pedido[] = [];
  pedidosOriginales: Pedido[] = [];
  displayedColumns: string[] = ['productos', 'precio', 'fecha', 'estado'];
  fechaInicio?: Date;
  fechaFin?: Date;
  filtroRangoActivo: boolean = false;
  filtroEstadoActivo: boolean = false;
  filtroEstadoActivo2: boolean = false;
  filtroEstadoSeleccionado: string = '';
  filtroUsuarioActivo: boolean = false;
  filtroPanaeroActivo: boolean = false;
  filtroPanaeroActivo2: boolean = false;
  filtroPanaderoSeleccionado: string = '';
  usuarioBuscado = '';
  boolSinDatos = false;
  panaderos: Usuario[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pedidosService: PedidosServiceService,
    public authService: AuthService,
    public dialog: MatDialog,
    private labBackendService: LabBackendService,
    private router: Router,
  ) {
    this.pedidos = new MatTableDataSource<Pedido>([]);
  }

  ngOnInit() {
    const nombre = this.authService.nombre;
    const rol = this.authService.role;
    if (rol === 'USER' && nombre !== null) {
      this.pedidosService.obtenerPedidos(nombre).subscribe(pedidos => {
        this.pedidos.data = pedidos;
        this.pedidosFiltrados = [...pedidos]; 
        this.pedidosOriginales = [...pedidos];
        this.pedidos.paginator = this.paginator;
      });
    } else if (rol === 'PANADERO' || rol === 'ADMIN') {
      // Si el rol es PANADERO o ADMIN, obtiene todos los pedidos
      this.displayedColumns.unshift('panadero');
      this.displayedColumns.unshift('usuario');
      this.pedidosService.obtenerTodosLosPedidos().subscribe(pedidos => {
        this.pedidos.data = pedidos;
        console.log(pedidos);
        this.pedidosFiltrados = [...pedidos]; 
        this.pedidosOriginales = [...pedidos];
        this.pedidos.paginator = this.paginator;
      });
      this.labBackendService.obtenerPanderos().subscribe(panaderos => {
        this.panaderos = panaderos;
      });
    }
  }

  applyUserFilter(event: Event) {
    this.filtroUsuarioActivo = true;
    this.usuarioBuscado = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue) {
      if (!this.filtroRangoActivo && !this.filtroEstadoActivo && !this.filtroPanaeroActivo) {
        this.pedidos.data = this.pedidosOriginales.filter(pedido =>
          pedido.email?.toLowerCase().includes(filterValue)
        );
      } else {
        this.pedidos.data = this.pedidosFiltrados.filter(pedido =>
          pedido.email?.toLowerCase().includes(this.usuarioBuscado)
        );
      }
    } else {
      this.filtroUsuarioActivo = false;
      if (!this.filtroRangoActivo && !this.filtroEstadoActivo) {
        this.pedidos.data = [...this.pedidosOriginales];
      }
      else {
        this.pedidos.data = [...this.pedidosFiltrados];
      }
    }
    this.pedidos._updateChangeSubscription();
  }

  openDialog(productos: any[]): void {
    this.dialog.open(ProductosDialogComponent, {
      data: { productos },
    });
  }

  openRangoFechaDialog(): void {
    const dialogRef = this.dialog.open(RangoFechaDialogComponent, {
      width: '500px',
      data: { fechaInicio: this.fechaInicio, fechaFin: this.fechaFin }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.fechaInicio && result.fechaFin) {
        this.fechaInicio = result.fechaInicio; 
        this.fechaFin = result.fechaFin; 
        this.ordenar('rango');   
      }
    });
  }
  

  ordenar(opcion: string): void {
    switch (opcion) {
      case 'ascendente':
        this.pedidos.data.sort((a, b) => {
          const fechaA = new Date(a.fecha.split('/').reverse().join('-')).getTime();
          const fechaB = new Date(b.fecha.split('/').reverse().join('-')).getTime();
          return fechaA - fechaB;
        });
        this.pedidos._updateChangeSubscription(); 
        break;
      
      case 'descendente':
        this.pedidos.data.sort((a, b) => {
          const fechaA = new Date(a.fecha.split('/').reverse().join('-')).getTime();
          const fechaB = new Date(b.fecha.split('/').reverse().join('-')).getTime();
          return fechaB - fechaA;
        });
        this.pedidos._updateChangeSubscription();
        break;
  
        case 'rango':
          this.filtroRangoActivo = true;
          this.aplicarFiltros();
          break;
  
        default:
        break;
    }
  }

  eliminarFiltro(): void {
    this.fechaInicio = undefined;
    this.fechaFin = undefined;
    this.filtroRangoActivo = false;
    this.pedidos.data = [...this.pedidosOriginales];
    if (this.filtroEstadoActivo) {
      this.filtrarPorEstado(this.filtroEstadoSeleccionado);
    } else if (this.filtroUsuarioActivo) {
      this.applyUserFilter({ target: { value: this.usuarioBuscado } } as any);
    } else if (this.filtroPanaeroActivo) {
      this.filtrarPorPanadero(this.filtroPanaderoSeleccionado);
    } else if (this.fechaFin && this.fechaInicio) {
      this.aplicarFiltros();
    } else {
      this.pedidos.data = [...this.pedidosOriginales];
      this.pedidos._updateChangeSubscription();
    }
  }

  eliminarFiltroEstado(): void {
    this.filtroEstadoActivo = false;
    this.filtroEstadoActivo2 = false;
    this.boolSinDatos = false;
    this.pedidos.data = [...this.pedidosOriginales];
    if (this.fechaInicio && this.fechaFin) {
      this.aplicarFiltros();
    } else if (this.filtroUsuarioActivo) {
      this.applyUserFilter({ target: { value: this.usuarioBuscado } } as any);
    } else if (this.filtroPanaeroActivo) {
      this.filtrarPorPanadero(this.filtroPanaderoSeleccionado);
    }
  }

  eliminarFiltroPanadero(): void {
    this.filtroPanaeroActivo = false;
    this.filtroPanaeroActivo2 = false;
    this.boolSinDatos = false;
    this.pedidos.data = [...this.pedidosOriginales];
    if (this.fechaInicio && this.fechaFin) {
      this.aplicarFiltros();
    } else if (this.filtroUsuarioActivo) {
      this.applyUserFilter({ target: { value: this.usuarioBuscado } } as any);
    } else if (this.filtroEstadoActivo) {
      this.filtrarPorEstado(this.filtroEstadoSeleccionado);
    }
  }
  

  ordenarEstado(estado: string): void {
    this.filtroEstadoActivo = true;
    this.filtroEstadoSeleccionado = estado;
    switch (estado) {
      case 'pendiente':
        this.filtrarPorEstado('pendiente');
        break;
      case 'en preparación':
        this.filtrarPorEstado('en preparación');
        break;
      case 'listo para entregar':
        this.filtrarPorEstado('listo para entregar');
        break;
      case 'entregado':
        this.filtrarPorEstado('entregado');
        break;
      default:
        break;
    }
  }

  ordenarPanadero(tipo: string): void {
    this.filtroPanaeroActivo = true;
    this.filtroPanaderoSeleccionado = tipo;
    switch (tipo) {
      case this.authService.nombre!:
        this.filtrarPorPanadero(this.authService.nombre!);
        break;
      case 'sinAsignar':
        this.filtrarPorPanadero('sinAsignar');
        break;
      default:
        break;
    }
  }

  private aplicarFiltros(): void {
    if (this.fechaInicio && this.fechaFin) {
      this.pedidosFiltrados = this.pedidos.data.filter(pedido => {
        const fechaPedido = new Date(pedido.fecha.split('/').reverse().join('-')).getTime();
        return fechaPedido >= this.fechaInicio!.getTime() && fechaPedido <= this.fechaFin!.getTime();
      });
      if (this.filtroUsuarioActivo) {
        this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => pedido.email?.toLowerCase().includes(this.usuarioBuscado));
      } 
      if (this.filtroEstadoActivo) {
        this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => pedido.estado === this.filtroEstadoSeleccionado);
      }
      if (this.filtroPanaeroActivo) {
        this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => pedido.panadero === this.filtroPanaderoSeleccionado);
      }
      this.actualizarTabla();
    }
  }

  private filtrarPorEstado(estado: string): void {
    console.log(estado);
    let filtradosPorEstado = this.pedidosOriginales.filter(pedido => pedido.estado === estado);
    console.log(filtradosPorEstado);
    if (this.filtroUsuarioActivo) {
      filtradosPorEstado = filtradosPorEstado.filter(pedido => pedido.email?.toLowerCase().includes(this.usuarioBuscado));
    }
    if (this.fechaInicio && this.fechaFin) {
      filtradosPorEstado = filtradosPorEstado.filter(pedido => {
        const fechaPedido = new Date(pedido.fecha.split('/').reverse().join('-')).getTime();
        return fechaPedido >= this.fechaInicio!.getTime() && fechaPedido <= this.fechaFin!.getTime();
      });
    }
    if (this.filtroPanaeroActivo) {
      filtradosPorEstado = filtradosPorEstado.filter(pedido => pedido.panadero === this.filtroPanaderoSeleccionado);
    }
    if (filtradosPorEstado.length > 0 ) {
      this.boolSinDatos = false;
      this.pedidosFiltrados = filtradosPorEstado;
      if (this.filtroUsuarioActivo) {
        this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => pedido.email?.toLowerCase().includes(this.usuarioBuscado));
      }
      if (this.filtroPanaeroActivo) {
        this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => pedido.panadero === this.filtroPanaderoSeleccionado);
      }
    } else {
      this.boolSinDatos = true;
      this.filtroEstadoActivo = false;
      this.filtroEstadoActivo2 = true;
    }
    this.actualizarTabla();
  }

  private filtrarPorPanadero(panadero: string): void {
    console.log(panadero);
    let filtradosPorPanadero = this.pedidosOriginales.filter(pedido => pedido.panadero === panadero);
    if (this.filtroUsuarioActivo) {
      filtradosPorPanadero = filtradosPorPanadero.filter(pedido => pedido.email?.toLowerCase().includes(this.usuarioBuscado));
    }
    if (this.fechaInicio && this.fechaFin) {
      filtradosPorPanadero = filtradosPorPanadero.filter(pedido => {
        const fechaPedido = new Date(pedido.fecha.split('/').reverse().join('-')).getTime();
        return fechaPedido >= this.fechaInicio!.getTime() && fechaPedido <= this.fechaFin!.getTime();
      });
    }
    if (this.filtroEstadoActivo) {
      filtradosPorPanadero = filtradosPorPanadero.filter(pedido => pedido.estado === this.filtroEstadoSeleccionado);
    }
    if (filtradosPorPanadero.length > 0) {
      this.boolSinDatos = false;
      this.pedidosFiltrados = filtradosPorPanadero;
      if (this.filtroUsuarioActivo) {
        this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => pedido.email?.toLowerCase().includes(this.usuarioBuscado));
      }
      if (this.filtroEstadoActivo) {
        this.pedidosFiltrados = this.pedidosFiltrados.filter(pedido => pedido.estado === this.filtroEstadoSeleccionado);
      }
    }
    else {  
      this.boolSinDatos = true;
      this.filtroPanaeroActivo = false;
      this.filtroPanaeroActivo2 = true;
    }
    this.actualizarTabla();
    }

  private actualizarTabla(): void {
    console.log(this.pedidosFiltrados);
    console.log(this.boolSinDatos);
    if (!this.boolSinDatos) {
      this.pedidos.data = this.pedidosFiltrados;
      this.pedidos._updateChangeSubscription(); 
    } else {
      this.pedidos.data = [];
      this.pedidos._updateChangeSubscription();
    }
  }

  obtenerEstadoSeleccionado(): string | undefined {
    if (this.pedidosFiltrados.length > 0 && this.pedidosFiltrados.every(pedido => pedido.estado === this.pedidosFiltrados[0].estado)) {
      return this.pedidosFiltrados[0].estado;
    }
    return undefined;
  }

  obtenerPanaderoSeleccionado(): string | undefined {
    if (this.pedidosFiltrados.length > 0 && this.pedidosFiltrados.every(pedido => pedido.panadero === this.pedidosFiltrados[0].panadero)) {
      return this.pedidosFiltrados[0].panadero;
    }
    return undefined;
  }

  public tomarPedido(pedido: Pedido): void {
    const nombre = this.authService.nombre!;
    this.pedidosService.tomarPedido(pedido, nombre).subscribe(() => {
      pedido.panadero = this.authService.nombre!;
      this.pedidos._updateChangeSubscription();
    });
  }

  public cambiarEstado(pedido: Pedido, estado: string): void {
    const estadoAnterior = pedido.estado;
    if (estado === 'entregado') {
      console.log('entregado');
      const dialogRef = this.dialog.open(EntregadoDialogComponent, {
        width: '300px',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          pedido.estado = estado;
          this.pedidosService.cambiarEstadoPedido(pedido, estado).subscribe();
          console.log(pedido);
        } else {
          pedido.estado = estadoAnterior;  
        }
      });
    } else {
      pedido.estado = estado;
      this.pedidosService.cambiarEstadoPedido(pedido, estado).subscribe();
    }
  }

  public asignarPanaderoAdmin(pedido: Pedido, panadero: string): void {
    console.log(pedido);
    console.log(panadero);
    pedido.panadero = panadero;
    this.pedidosService.tomarPedido(pedido, panadero).subscribe();
  }

  public tablInsumosNecesarios(pedido: Pedido[]): void {
    this.router.navigate(['/insumosPedido'], { queryParams: { pedidos: JSON.stringify(pedido) } });
  }
}

