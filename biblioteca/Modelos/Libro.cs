using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace biblioteca.Modelos
{
    public class Libro
    {
        public int Id { get; set; }
        [Required]
        public string nombre { get; set; }
        [Required]
        public string isbn  { get; set; }

        [Required]
        [ForeignKey("Autor")]
        public int idautor { get; set; }
        [Required]
        [ForeignKey("Categoria")]
        public int idcategoria { get; set; }

    }
}
