import {Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth-service.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CarritoService } from './Services/carrito.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('menuIconAnimation', [
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
      state('open', style({
        transform: 'rotate(180deg)'
      })),
      transition('closed <=> open', animate('200ms ease-in-out'))
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'Laboratorio';
  isLoggedIn = false;
  isSmallScreen = false;
  productosCount: number = 0;

  public menuState: String = "closed";

  ngOnInit() {
    this.breakpointObserver.observe([
      '(max-width: 599px)'
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    this.carritoService.productosCount$.subscribe(count => {
      this.productosCount = count;
    });
  }

  constructor(private router: Router,
    public authService: AuthService,
    public breakpointObserver: BreakpointObserver,
    public carritoService: CarritoService
  ){} 

  toggleMenu() {
    this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/iniciarSesion']);
  }

  nuevoProducto() {
    this.router.navigate(['/nuevoProducto']);
  }

  productos() {
    this.router.navigate(['/productos']);
  }

  insumos() {
    this.router.navigate(['/insumos']);
  }

  registrarse() {
    this.router.navigate(['/registrarse']);
  }

  iniciarSesion() { 
    this.router.navigate(['/iniciarSesion']);
  }

  registrarUsuario() { 
    this.router.navigate(['/registrarse']);
  }

  home() {
    if (this.authService.role === 'USER') {
      this.router.navigate(['/home']);
    } else if (this.authService.role === 'ADMIN') {
      this.router.navigate(['/productos']);
    }
  }

  carrito() {
    this.router.navigate(['/carrito']);
  }

  pedidos() {
    this.router.navigate(['/pedidos']);
  }
}
