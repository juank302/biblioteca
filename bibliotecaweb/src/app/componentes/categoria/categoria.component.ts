import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  constructor(private modalService: BsModalService, private formbuilder: FormBuilder,private categoriaservicio:CategoriaService) { }
  modalRef: BsModalRef;
  listaCategorias : any[] =[];
  formCategoria =  this.formbuilder.group({
     Id:[0],
    nombre:['',Validators.required],
    descripcion:['',Validators.required]
  });
  
  ngOnInit() {
      this.ObtenerCategorias();
  }

  abrirpopCategoria(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }
  GuardarCategoria(){
    if (this.formCategoria.invalid) {
      let invalidos: any[];
      const controles = this.formCategoria.controls
      for (let nom in controles) {
        let control = this.formCategoria.get(nom)
        if (control.invalid) {
          control.markAsTouched();
        }
      }
    }else{
      if(this.formCategoria.get("Id").value =="0"){
            this.categoriaservicio.CrearCategoria(this.formCategoria.value).subscribe(data =>{
             this.ObtenerCategorias();
             this.modalRef.hide();
            });
          }else{
            this.EditarCategoria(this.formCategoria.value);
          }
    }
  }
  AbrirEditarCategoria(id,template){
    let cate = this.listaCategorias.find(x=>x.Id == id);
    console.log(cate);
    this.formCategoria.get("Id").setValue(cate.Id);
    this.formCategoria.get("nombre").setValue(cate.nombre);
    this.formCategoria.get("descripcion").setValue(cate.descripcion);  
    this.modalRef = this.modalService.show(template);
  }
  eliminarCategoria(id){
    this.categoriaservicio.Eliminar(id).subscribe(data =>{     
      console.log(data);
      this.ObtenerCategorias();
    });
  }
  ObtenerCategorias(){
    this.categoriaservicio.ObtenerTodos().subscribe(data =>{
      this.listaCategorias = data;
    })
  }
  EditarCategoria(data){
    this.categoriaservicio.Editar(data).subscribe(data =>{
      this.ObtenerCategorias();
      this.modalRef.hide();
      this.formCategoria.reset();
    });

    
  }

}
