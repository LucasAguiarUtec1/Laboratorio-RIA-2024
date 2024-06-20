import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { MatCardModule } from '@angular/material/card';
import { ProductosComponent } from './productos/productos.component'
import {MatTableModule} from '@angular/material/table';
import { InsumosComponent } from './insumos/insumos.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditarProductoComponent } from './editar-producto/editar-producto.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { MatSelectModule } from '@angular/material/select';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';
import { HomePageComponent } from './home-page/home-page.component'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { CarritoComponent } from './carrito/carrito.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PedidosComponent } from './pedidos/pedidos.component';


@NgModule({
  declarations: [
    AppComponent,
    NuevoProductoComponent,
    ProductosComponent,
    InsumosComponent,
    RegistrarseComponent,
    IniciarSesionComponent,
    EditarProductoComponent,
    ForgotPasswordDialogComponent,
    HomePageComponent,
    CarritoComponent,
    PedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
