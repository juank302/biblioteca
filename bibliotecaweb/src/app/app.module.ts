import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { AutorComponent } from './componentes/autor/autor.component';
import { LibroComponent } from './componentes/libro/libro.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { HttpClientModule,HttpHeaders } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    CategoriaComponent,
    AutorComponent,
    LibroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    TypeaheadModule.forRoot()
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
