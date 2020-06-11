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
    public class Categorias : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public String Get()
        {
            var cat = new CategoriaRepositorio();
            return cat.GetTodos();

        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Categoria categoria)
        {
            try
            {
                var cat = new CategoriaRepositorio();
                cat.Guardar(categoria);
                return Ok(new { ok = "ok" });
            }
            catch (Exception e)
            {
                return Ok(new { error = e.Message });
            }

        }

        [HttpPut]
        [Authorize]
        public IActionResult Editar(Categoria cat)
        {
            try
            {
                var catego = new CategoriaRepositorio();
                catego.Editar(cat);
                return Ok(new { ok = "ok" });
            }
            catch (Exception e)
            {
                return Ok(new { error = e.Message });
            }


        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Eliminar(string id)
        {
            try
            {
                var cat = new CategoriaRepositorio();
                int idint = int.Parse(id);
                cat.Eliminar(idint);
                return Ok(new { ok = "ok" });
            }
            catch (Exception e)
            {
                return Ok(new { error = e.Message });
            }


        }
    }
}
