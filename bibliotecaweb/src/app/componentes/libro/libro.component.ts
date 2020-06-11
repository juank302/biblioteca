import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { LibroService } from 'src/app/servicios/libro.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { AutorService } from 'src/app/servicios/autor.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  customSelected: string;


  constructor(private modalService: BsModalService, private formbuilder: FormBuilder, private libroservicio: LibroService, private categoriaservicio: CategoriaService, private autorservicio: AutorService) { }
  modalRef: BsModalRef;
  noResult: boolean = false;

  formlibro = this.formbuilder.group({
    Id: ["0"],
    nombre: ['', Validators.required],
    isbn: ['', Validators.required],
    idautor: ['0', Validators.required],
    idcategoria: ['0', Validators.required]
  });
  Listacategorias: any[] = [];
  ListaAutores: any[] = [];
  ListaLibros: any[] = []

  ngOnInit() {
    this.CargarAutores();
    this.CargarCategorias();
    this.cargarLibros();

  }
  CargarCategorias() {
    this.categoriaservicio.ObtenerTodos().subscribe(data => {
      this.Listacategorias = data;

    });
  }
  CargarAutores() {
    this.autorservicio.ObtenerTodos().subscribe(data => {
      this.ListaAutores = data;
      /* data.forEach(element => {
        let aut ={
          Id:element.Id,
          nombres:element.nombres
        }
        this.ListaAutores.push(aut);
      });*/
    });
  }
  abrirpopLibro(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);
  }
  noresultados(event: boolean): void {
    this.noResult = event;
  }
  GuardarLibro() {
    if (this.formlibro.invalid) {
      let invalidos: any[];
      const controles = this.formlibro.controls
      for (let nom in controles) {
        let control = this.formlibro.get(nom)
        if (control.invalid) {
          control.markAsTouched();
        }
      }
    } else {

      if (this.formlibro.get("Id").value == "0") {
        this.libroservicio.CrearLibro(this.formlibro.value).subscribe(data => {
          this.cargarLibros();
          this.modalRef.hide();
        });
      } else {
        this.EditarLibro(this.formlibro.value);
      }


    }
  }
  EditarLibro(data) {
    this.libroservicio.Editar(data).subscribe(data => {
      this.cargarLibros();
      this.formlibro.reset();
      this.modalRef.hide();
    });
  }
  cargarLibros() {
    this.libroservicio.ObtenerTodos().subscribe(data => {      
      this.ListaLibros = data;      
    })
  }
  AbrirEditarLibro(id, template) {
    let libro = this.ListaLibros.find(x => x.Id == id);
    this.formlibro.get("Id").setValue(libro.Id);
    this.formlibro.get("nombre").setValue(libro.nombre);
    this.formlibro.get("isbn").setValue(libro.isbn);
    this.formlibro.get("idautor").setValue(libro.idautor);
    this.formlibro.get("idcategoria").setValue(libro.idcategoria);
    this.modalRef = this.modalService.show(template);
  }
  eliminarLibro(id) {
    console.log(id);
    this.libroservicio.Eliminar(id).subscribe(data => {
      this.cargarLibros();
    });
  }
  GetAutor(id) {

    let autor = this.ListaAutores.find(x => x.Id == id)
    return autor.nombres + " " + autor.apellidos;
  }
  GetCategoria(id) {
    return this.Listacategorias.find(x => x.Id == id).nombre
  }

  BuscarLibro(txt, opcion) {
    setTimeout(() => {
      let txtbuscar = "";
      txtbuscar = txt.value     
      let arraux: any[] = this.ListaLibros;
      arraux = this.ListaLibros
      if (txtbuscar == "") {
        this.cargarLibros();
       return
      };
      if (opcion.value == 1) {
       let busqueda = this.ListaLibros.filter(x => x.nombre.includes(txtbuscar))      
       if(busqueda.length > 0)
       this.ListaLibros =[];
       this.ListaLibros = busqueda;
      }if(opcion.value == 2){
        let busqueda: any[] = this.ListaAutores;
        let bus:any[]  = busqueda.filter(x => x.nombres.includes(txtbuscar))
        let libros:any[] =[];
        if(bus.length >0 ){        
          bus.forEach(element => {
           libros.push(this.ListaLibros.find(x => x.idautor === element.Id ))
          });
          this.ListaLibros =[];
          this.ListaLibros = libros;
        }
      
      }
      if(opcion.value ==3){
        let busqueda: any[] = this.Listacategorias;
        let bus:any[]  = busqueda.filter(x => x.nombre.includes(txtbuscar))
        let catego:any[] =[];
        if(bus.length >0 ){
          bus.forEach(element => {
            catego.push(this.ListaLibros.find(x => x.idcategoria === element.Id ))
           });
           this.ListaLibros =[];
           this.ListaLibros = catego;
        }
      }


    }, 300);
  }
}
