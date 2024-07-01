import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './Services/auth-service.service';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  // Aquí puedes obtener el rol desde el AuthService
  const userRole = authService.getRoleFromStorage();

  const path = route.routeConfig?.path;

  // Lógica para permitir o denegar el acceso basado en el rol y la ruta
  if ((path === 'nuevoProducto' || path === 'nuevoInsumo' || path === 'addInsumoProducto/:id') && userRole === 'ADMIN') {
    return true;
  } else if (((path === 'productos' || path === 'insumos' || path === 'insumosPedido') ) && (userRole === 'ADMIN' || userRole === 'PANADERO')) {
    return true;
  } else if ((path === 'home' || path === 'carrito') && userRole === 'USER') {
    return true;
  } else if (path === 'pedidos' && (userRole === 'USER' || userRole === 'ADMIN' || userRole === 'PANADERO')) {
    return true;
  }
  else {
    // Redireccionar a una página de acceso denegado o a la página de inicio
    return false;
  }
};