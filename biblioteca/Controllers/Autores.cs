using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using biblioteca.Modelos;
using biblioteca.Repositorio;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http2.HPack;
using Newtonsoft.Json;

namespace biblioteca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Autores : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public String Get()
        {
            var aut = new AutorRepositorio();            
            return aut.GetTodos(); 

        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Eliminar(string id)
        {
            try
            {
               var aut = new AutorRepositorio();
            int idint = int.Parse(id);
             aut.Eliminar(idint);
                return Ok(new { ok = "ok" });
            }
            catch (Exception e)
            {
                return Ok(new { error = e.Message });
            }
            

        }

        [HttpPut]
        [Authorize]
        public IActionResult Editar(Autor au)
        {
            try
            {
                var aut = new AutorRepositorio();
                aut.Editar(au);
                return Ok(new { ok = "ok" });
            }
            catch (Exception e)
            {
                return Ok(new { error = e.Message });
            }


        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Autor autor)
        {
            try
            {
            var aut = new AutorRepositorio();
            aut.Guardar(autor);
            return Ok(new { ok = "ok" });
            }
            catch (Exception e)
            {
                return Ok(new { error = e.Message });
            }
           
        }
    }
}
