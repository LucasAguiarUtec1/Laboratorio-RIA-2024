import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { ProductosComponent } from './productos/productos.component';
import { InsumosComponent } from './insumos/insumos.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { InsumosProductoComponent } from './insumos-producto/insumos-producto.component';
import { NuevoInsumoComponent } from './nuevo-insumo/nuevo-insumo.component';
import { AddInsumoProductoComponent } from './add-insumo-producto/add-insumo-producto.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { InsumosPedidoComponent } from './insumos-pedido/insumos-pedido.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { roleGuardGuard } from './role-guard.guard'; // Asegúrate de la ruta correcta


const routes: Routes = [
  {path: "nuevoProducto" , component: NuevoProductoComponent, canActivate: [roleGuardGuard] },
  {path: 'productos', component: ProductosComponent, canActivate: [roleGuardGuard] },
  {path: 'insumos', component: InsumosComponent, canActivate: [roleGuardGuard] },
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'iniciarSesion', component: IniciarSesionComponent},
  {path: '', redirectTo: '/iniciarSesion', pathMatch: 'full'}, 
  {path: 'home', component: HomePageComponent, canActivate: [roleGuardGuard] },
  {path: 'carrito', component: CarritoComponent, canActivate: [roleGuardGuard]},
  {path: 'pedidos', component: PedidosComponent, canActivate: [roleGuardGuard]},
  {path: 'nuevoInsumo', component: NuevoInsumoComponent, canActivate: [roleGuardGuard]},
  {path: 'insumoProducto/:id', component: InsumosProductoComponent },
  {path: 'addInsumoProducto/:id', component: AddInsumoProductoComponent, canActivate: [roleGuardGuard]},
  {path: 'reset-password/:token', component: ResetPassComponent},
  {path: 'insumosPedido', component: InsumosPedidoComponent},
  {path: 'miPerfil', component: MiPerfilComponent},
  {path: 'insumosPedido', component: InsumosPedidoComponent, canActivate: [roleGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
