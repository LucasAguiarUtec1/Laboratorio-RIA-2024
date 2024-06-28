import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from '../models/pedido.model';
import { Insumo } from '../models/insumo'; 
import { InsumosService } from '../Services/insumos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../models/producto'; 

@Component({
  selector: 'app-insumos-pedido',
  templateUrl: './insumos-pedido.component.html',
  styleUrls: ['./insumos-pedido.component.css']
})
export class InsumosPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  insumos: Insumo[] = [];
  insumosPedido: any[] = [];

  constructor(private route: ActivatedRoute,
              private insumosService: InsumosService,
              private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['pedidos']) {
        this.pedidos = JSON.parse(params['pedidos']);
      }
    });
    this.cargarInsumos();
    this.cargarInsumosPedido();
  }

  cargarInsumos(): void {
    this.insumosService.getInsumos().subscribe({
      next: (data: Insumo[]) => {
        this.insumos = data;
        this.insumosPedido.forEach(insumoPedido => {
          const insumoInfo = this.insumos.find(insumo => insumo.id === insumoPedido.id);
          if (insumoInfo) {
            insumoPedido.nombre = insumoInfo.nombre;
            insumoPedido.unidad = insumoInfo.unidad;
          }
        });
      },
      error: (error) => {
        this.snackbar.open('Error al cargar insumos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cargarInsumosPedido(): void {
    this.insumosPedido = []; 
  
    this.pedidos.forEach(pedido => {
      pedido.productos.forEach(producto => {
        producto.insumos.forEach((insumo: any) => {
          const insumoExistente = this.insumosPedido.find(i => i.id === insumo.id);
          if (insumoExistente) {
            insumoExistente.cantidad += insumo.cantidad;
          } else {
            this.insumosPedido.push({
              id: insumo.id,
              cantidad: insumo.cantidad 
            });
          }
        });
      });
    });
    console.log(this.insumosPedido);
  }
}
