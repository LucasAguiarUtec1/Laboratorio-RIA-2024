import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { ProductosComponent } from './productos/productos.component';
import { InsumosComponent } from './insumos/insumos.component';

const routes: Routes = [
  {path: "nuevoProducto" , component: NuevoProductoComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'insumos', component: InsumosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
