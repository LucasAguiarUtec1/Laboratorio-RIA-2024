import { Component, OnInit } from '@angular/core';
import { Pedido } from '../models/pedido.model';
import { PedidosServiceService } from '../Services/pedidos-service.service';
import { AuthService } from '../Services/auth-service.service';
import { ProductosDialogComponent } from '../productos-dialog/productos-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  displayedColumns: string[] = ['productos', 'precio', 'fecha', 'estado'];

  constructor(private pedidosService: PedidosServiceService, private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    if (this.authService.nombre !== null) {
      this.pedidosService.obtenerPedidos(this.authService.nombre).subscribe(pedidos => {
        this.pedidos = pedidos;
      });
    }
  }

  openDialog(productos: any[]): void {
    this.dialog.open(ProductosDialogComponent, {
      data: { productos },
    });
  }
}
