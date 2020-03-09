using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{

	public class BeneficiarioModel
	{
		public long Id { get; set; }

		[MaxLength(14)]
		[Required(ErrorMessage = "Favor digitar o CPF")]
		[CustomValidationCPF(ErrorMessage = "CPF inválido")]
		[Display(Name ="CPF")]
		public string CPFBeneficiario { get; set; }

		[Required(ErrorMessage = "Favor digitar o nome")]
		[Display(Name = "Nome")]
		public string NomeBeneficiario { get; set; }
		public long IdCliente { get; set; }
	}
	public class BENEFICIARIOS
	{
		[Key]
		public long Id { get; set; }

		[Required]
		public string Nome { get; set; }

		[Required]
		public string CPF { get; set; }

		[Required]
		public long IdCliente { get; set; }
	}
}