import {Component} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service.service';


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
export class AppComponent {
  title = 'Laboratorio';
  isLoggedIn = false;

  public menuState: String = "closed";

  constructor(private router: Router,
    public authService: AuthService
  ){} 

  toggleMenu() {
    this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
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
}
