using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using biblioteca.Modelos;
using biblioteca.Repositorio;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace biblioteca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]  
    public class ValuesController : ControllerBase
    {
      
       
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            var obj = new UsuarioRepositorio();
            var obj2 = obj.Obtener(null);
            return JsonConvert.SerializeObject(obj2, new JsonSerializerSettings());
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] Usuario usr)
        {

            return CreatedAtAction("prueba", "{ok:1}");
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
