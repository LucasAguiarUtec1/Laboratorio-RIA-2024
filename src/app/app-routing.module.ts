import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarseComponent } from './registrarse/registrarse.component';

const routes: Routes = [
  { path: 'registrarse', component: RegistrarseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
