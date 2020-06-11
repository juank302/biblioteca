using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using biblioteca.Modelos;
using biblioteca.Repositorio;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace biblioteca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Usuarios : ControllerBase
    {
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            var obj = new UsuarioRepositorio();
            var obj2 = obj.Obtener(null);
            return JsonConvert.SerializeObject(obj2, new JsonSerializerSettings());
        }
        [HttpPost]
        public IActionResult Post([FromBody] Usuario usr)
        {
            var ob = new UsuarioRepositorio();
            var lista = ob.Obtener(usr);
            if (lista.Count > 0)
            {
                string token = GenerateToken(usr);
            return Ok(new {ok ="ok",jwt=token });
            }
            else { return Ok(new { error = "usuario y/o contraseña no válidos" }); }
            
        }


        public string GenerateToken(Usuario u)
        {
            var mySecret = "asdv234234^&%&^%&^hjsdfb2%%%";
            var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.NameIdentifier, u.usr.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),               
                SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
