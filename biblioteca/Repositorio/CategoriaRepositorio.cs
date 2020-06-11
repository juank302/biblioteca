using biblioteca.Modelos;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace biblioteca.Repositorio
{
    public class CategoriaRepositorio
    {
        public string GetTodos()
        {
            using (var db = new Contexto())
            {
                var todos = db.categoria.ToList();
                return JsonConvert.SerializeObject(todos);
            }
        }
        public string Guardar(Categoria cate)
        {
            using (var db = new Contexto())
            {
                db.categoria.Add(cate);
                db.SaveChanges();
                return "{ok:1}";
            }
        }
        public string Eliminar(int id)
        {
            using (var db = new Contexto())
            {
                Categoria cat = db.categoria.Where(u => u.Id == id).FirstOrDefault();
                db.categoria.Remove(cat);
                db.SaveChanges();
                return "{ok:1}";
            }
        }

        public string Editar(Categoria cat)
        {
            using (var db = new Contexto())
            {

                db.categoria.Update(cat);
                db.SaveChanges();
                return "{ok:1}";
            }
        }
    }
}
