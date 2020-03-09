using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    public class Context:DbContext
    {
        public Context() : base("BancoDeDados") { }
        public DbSet<BENEFICIARIOS> Benef { get; set; }
    }
}