using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using biblioteca.Modelos;
using biblioteca.Repositorio;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace biblioteca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Libros : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public String Get()
        {
            var lib = new LibroRepositorio();
            return lib.GetTodos();

        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Eliminar(string id)
        {
            try
            {
                var lib = new LibroRepositorio();
                int idint = int.Parse(id);
                lib.Eliminar(idint);
                return Ok(new { ok = "ok" });
            }
            catch (Exception e)
            {
                return Ok(new { error = e.Message });
            }


        }

        [HttpPut]
        [Authorize]
        public IActionResult Editar(Libro lib)
        {
            try
            {
                var libro = new LibroRepositorio();
                libro.Editar(lib);
                return Ok(new { ok = "ok" });
            }
            catch (Exception e)
            {
                return Ok(new { error = e.Message });
            }


        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Libro lib)
        {
            try
            {
                var libror = new LibroRepositorio();
                libror.Guardar(lib);
                return Ok(new { ok = "ok" });
            }
            catch (Exception e)
            {
                return Ok(new { error = e.Message });
            }

        }
    }
}
