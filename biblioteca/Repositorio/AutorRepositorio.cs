using biblioteca.Modelos;
using Microsoft.AspNetCore.Diagnostics;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace biblioteca.Repositorio
{
    public class AutorRepositorio
    {
        public string Guardar(Autor autor)
        {
            using (var db = new Contexto())
            {
                db.autor.Add(autor);
                db.SaveChanges();
                return "{ok:1}";
            }
        }

        public string GetTodos()
        {
            using (var db = new Contexto())
            {
              var todos =  db.autor.ToList();
                return JsonConvert.SerializeObject(todos);
            }
        }

        public string Eliminar(int id)
        {
            using (var db = new Contexto())
            {
                Autor aut = db.autor.Where(u => u.Id == id).FirstOrDefault();
                db.autor.Remove(aut);
                db.SaveChanges();
               return  "{ok:1}";
            }
        }
        public string Editar(Autor autor)
        {
            using (var db = new Contexto())
            {

                db.autor.Update(autor);
                db.SaveChanges();
                return "{ok:1}";
            }
        }
    }
}
