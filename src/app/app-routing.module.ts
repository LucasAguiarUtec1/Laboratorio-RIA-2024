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


const routes: Routes = [
  {path: "nuevoProducto" , component: NuevoProductoComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'insumos', component: InsumosComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'iniciarSesion', component: IniciarSesionComponent},
  {path: '', redirectTo: '/iniciarSesion', pathMatch: 'full'}, 
  {path: 'home', component: HomePageComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'nuevoInsumo', component: NuevoInsumoComponent},
  {path: 'insumoProducto/:id', component: InsumosProductoComponent},
  {path: 'addInsumoProducto/:id', component: AddInsumoProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
