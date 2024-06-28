import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PedidosComponent } from './pedidos/pedidos.component';

import { ProductosComponent } from './productos/productos.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { InsumosComponent } from './insumos/insumos.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';
import { HomePageComponent } from './home-page/home-page.component'; 
import { CarritoComponent } from './carrito/carrito.component';
import { NuevoInsumoComponent } from './nuevo-insumo/nuevo-insumo.component';
import { EditarInsumoComponent } from './editar-insumo/editar-insumo.component';
import { InsumosProductoComponent } from './insumos-producto/insumos-producto.component';
import { AddInsumoProductoComponent } from './add-insumo-producto/add-insumo-producto.component';

import { ProductoPipe } from './pipes/producto-pipe.pipe';
import { InsumosPipe } from './pipes/insumos.pipe';

import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ProductosDialogComponent } from './productos-dialog/productos-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RangoFechaDialogComponent } from './rango-fecha-dialog/rango-fecha-dialog.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { EntregadoDialogComponent } from './entregado-dialog/entregado-dialog.component';
import { InsumosDialogComponent } from './insumos-dialog/insumos-dialog.component';
import { InsumosPedidoComponent } from './insumos-pedido/insumos-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    NuevoProductoComponent,
    InsumosComponent,
    RegistrarseComponent,
    IniciarSesionComponent,
    EditarProductoComponent,
    ForgotPasswordDialogComponent,
    HomePageComponent,
    CarritoComponent,
    PedidosComponent,
    NuevoInsumoComponent,
    EditarInsumoComponent,
    InsumosProductoComponent,
    AddInsumoProductoComponent,
    ProductoPipe,
    InsumosPipe,
    ProductosDialogComponent,
    RangoFechaDialogComponent,
    ResetPassComponent,
    EntregadoDialogComponent,
    InsumosDialogComponent,
    InsumosPedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSort,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
