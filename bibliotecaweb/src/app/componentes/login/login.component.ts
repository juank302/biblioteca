import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup, FormArray } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private formbuilder: FormBuilder, private usuario: UsuarioService, private http: HttpClient) { }
  formLogin = this.formbuilder.group({
    usr: ['', Validators.required],
    psw: ['', Validators.required]
  })
  error: string = "";
  ngOnInit() {
  }
  Ingresar() {
    if (this.formLogin.invalid) {
      let invalidos: any[];
      const controles = this.formLogin.controls
      for (let nom in controles) {
        let control = this.formLogin.get(nom)
        if (control.invalid) {
          control.markAsTouched();
        }
      }
    } else {
      let obj = this.formLogin.value

      this.usuario.Getusuario(this.formLogin.value).subscribe(data => {

        if (data !== undefined) {
          if (data["error"] !== undefined) {
            this.error = data["error"];
          }else{
            localStorage.setItem("jwt",data["jwt"] );
            this.router.navigateByUrl("/principal/libro")
          }
        }
      });   

    }

  }
}
