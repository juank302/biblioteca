import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { AutorComponent } from './componentes/autor/autor.component';
import { LibroComponent } from './componentes/libro/libro.component';
import { AuthGuardService } from './guards/auth-guard.service';



const routes: Routes = [{path:'', component: LoginComponent},{path:"principal",component:PrincipalComponent,canActivate:[AuthGuardService], canActivateChild :[AuthGuardService],
children:[{path:'categoria', component:CategoriaComponent},{path:'autor', component:AutorComponent},{path:'libro', component:LibroComponent}]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
