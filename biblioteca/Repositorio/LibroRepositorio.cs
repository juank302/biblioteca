using biblioteca.Modelos;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace biblioteca.Repositorio
{
    public class LibroRepositorio
    {
        public string Guardar(Libro libro)
        {
            using (var db = new Contexto())
            {
                db.libro.Add(libro);
                db.SaveChanges();
                return "{ok:1}";
            }
        }

        public string GetTodos()
        {
            using (var db = new Contexto())
            {
                var todos = db.libro.ToList();
                return JsonConvert.SerializeObject(todos);
            }
        }

        public string Eliminar(int id)
        {
            using (var db = new Contexto())
            {
                Libro lib = db.libro.Where(u => u.Id == id).FirstOrDefault();
                db.libro.Remove(lib);
                db.SaveChanges();
                return "{ok:1}";
            }
        }
        public string Editar(Libro lib)
        {
            using (var db = new Contexto())
            {

                db.libro.Update(lib);
                db.SaveChanges();
                return "{ok:1}";
            }
        }

    }
}
