using biblioteca.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace biblioteca.Repositorio
{
    public class UsuarioRepositorio
    {
        public List<Usuario> Obtener(Usuario usr)
        {
            using (var db  =  new Contexto())
            {
                return db.usuario.Where(u => u.usr == usr.usr && u.psw == usr.psw).ToList();
            }
        }
    }
}
