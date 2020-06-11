using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace biblioteca.Modelos
{
    public class Categoria
    {
        public int Id { get; set;}
        [Required]
        public string nombre { get; set; }
        [Required]
        public string descripcion { get; set; }

    }
}
