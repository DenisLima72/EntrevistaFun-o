using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de Modelo de Cliente
    /// </summary>
    public class ClienteModel
    {
        public long Id { get; set; }
        
        /// <summary>
        /// CEP
        /// </summary>
        [Required(ErrorMessage="Favor digitar o CEP") ]
        public string CEP { get; set; }

        /// <summary>
        /// Cidade
        /// </summary>
        [Required(ErrorMessage = "Favor digitar a Cidade")]
        public string Cidade { get; set; }

        /// <summary>
        /// E-mail
        /// </summary>
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$", ErrorMessage = "Digite um e-mail válido")]
        public string Email { get; set; }

        /// <summary>
        /// Estado
        /// </summary>
        [Required (ErrorMessage = "Favor digitar o Estado")]
		[MaxLength(2)]
        public string Estado { get; set; }

        /// <summary>
        /// Logradouro
        /// </summary>
        [Required(ErrorMessage = "Favor digitar o Logradouro")]
        public string Logradouro { get; set; }

        /// <summary>
        /// Nacionalidade
        /// </summary>
        [Required(ErrorMessage = "Favor digitar a Nacionalidade")]
        public string Nacionalidade { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required(ErrorMessage = "Favor digitar o Nome")]
        public string Nome { get; set; }

        /// <summary>
        /// Sobrenome
        /// </summary>
        [Required(ErrorMessage = "Favor digitar o Sobrenome")]
        public string Sobrenome { get; set; }

        /// <summary>
        /// Telefone
        /// </summary>
        public string Telefone { get; set; }

		/// <summary>
		/// CPF
		/// </summary>
		
		[MaxLength(15)]
		[Required(ErrorMessage = "CPF")]
		[CustomValidationCPF(ErrorMessage = "CPF inválido")]
		public string CPF { get; set; }

		public List<BeneficiarioModel> Beneficiarios { get; set; }

		public ClienteModel()
		{
		
			this.Beneficiarios = new List<BeneficiarioModel>();
		}

	}

}