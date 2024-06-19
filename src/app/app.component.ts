import {Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth-service.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


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

  public menuState: String = "closed";

  ngOnInit() {
    this.breakpointObserver.observe([
      '(max-width: 599px)'
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  constructor(private router: Router,
    public authService: AuthService,
    public breakpointObserver: BreakpointObserver,
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
    this.router.navigate(['/home']);
  }

  carrito() {
    this.router.navigate(['/carrito']);
  }
}
