using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace biblioteca.Modelos
{
    public class Autor
    {
        public int Id { get; set; }
        [Required]
        public string nombres { get; set; }     
        public string apellidos { get; set; }
        public DateTime fecnacimiento { get; set; }

    }
}
