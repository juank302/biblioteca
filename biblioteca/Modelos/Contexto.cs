using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace biblioteca.Modelos
{
    public class Contexto:DbContext
    {
        public DbSet<Autor> autor { get; set; }
        public DbSet<Libro> libro { get; set; }
        public DbSet<Categoria> categoria { get; set; }
        public DbSet<Usuario> usuario { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=DESKTOP-D81P5MN\SQL2016;Initial Catalog=Biblioteca;Integrated Security=True");
        }
    }
}
