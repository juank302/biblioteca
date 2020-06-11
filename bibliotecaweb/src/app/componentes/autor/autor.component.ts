import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import * as $ from 'jquery';
import { AutorService } from 'src/app/servicios/autor.service';
@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
 
  constructor(private modalService: BsModalService,private formbuilder: FormBuilder,private Autorservicio : AutorService) {}
   modalRef: BsModalRef;
   listaAutores:any =[];
  formAutor = this.formbuilder.group({
    Id:["0"],
    nombres:['',Validators.required],
    apellidos:[''],
    fecnacimiento:['']
  })
  ngOnInit() {  
  this.ObtenerAutores();


  }

  abrirpopAutor(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }
  GuardarAutor(){
    if (this.formAutor.invalid) {
      let invalidos: any[];
      const controles = this.formAutor.controls
      for (let nom in controles) {
        let control = this.formAutor.get(nom)
        if (control.invalid) {
          control.markAsTouched();
        }
      }
    }
    else{
      if(this.formAutor.get("Id").value =="0"){
     this.Autorservicio.CrearAutor(this.formAutor.value).subscribe(data =>{
      console.log(data);
      this.modalRef.hide();
      this.ObtenerAutores();
      this.formAutor.reset();
  });
}else{
  this.EditarAutor(this.formAutor.value);
}

    }
  }
  ObtenerAutores(){
    this.Autorservicio.ObtenerTodos().subscribe(data =>{
      this.listaAutores = [];
      this.listaAutores = data;
      
  });
  }

  eliminarAutor(id){    
    this.Autorservicio.Eliminar(id).subscribe(data =>{     
      console.log(data);
      this.ObtenerAutores();
    });
  }
  AbrirEditarAutor(id,template){
    let autor = this.listaAutores.find(x=>x.Id == id);
    console.log(autor);
    this.formAutor.get("Id").setValue(autor.Id);
    this.formAutor.get("nombres").setValue(autor.nombres);
    this.formAutor.get("apellidos").setValue(autor.apellidos);
    this.formAutor.get("fecnacimiento").setValue(autor.fecnacimiento);
    this.modalRef = this.modalService.show(template);
  }

 EditarAutor(data){
   this.Autorservicio.Editar(data).subscribe(data =>{
     this.ObtenerAutores();
     this.formAutor.reset();
    this.modalRef.hide();
   });
 }

}
