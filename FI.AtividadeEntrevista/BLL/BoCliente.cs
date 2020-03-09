using FI.AtividadeEntrevista.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoCliente
    {
        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public long Incluir(DML.Cliente cliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Incluir(cliente);
        }

		public long IncluirCliente(DML.Cliente cliente)
		{
			DAL.DaoCliente cli = new DAL.DaoCliente();

			ValidadorCpf validadorCPF = new ValidadorCpf();

			if (!validadorCPF.Validar(cliente.CPF)) {
				throw new Exception($"O CPF do cliente [{cliente.Nome.ToUpper()}] não está correto!");
			}

			if (VerificarExistencia(cliente.CPF,cliente.Id)){
				throw new Exception($"Já existe um cliente com o CPF informado!");
			}

			foreach (var item in cliente.Beneficiarios)
			{
				if (!validadorCPF.Validar(item.CPF)) {
					throw new Exception($"O CPF do beneficiário [{item.Nome.ToUpper()}] não está correto!");
				}
			}

			return cli.Incluir(cliente);
		}

		/// <summary>
		/// Altera um cliente
		/// </summary>
		/// <param name="cliente">Objeto de cliente</param>
		public void Alterar(DML.Cliente cliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();

			ValidadorCpf validadorCPF = new ValidadorCpf();

			if (!validadorCPF.Validar(cliente.CPF))
			{
				throw new Exception($"O CPF do cliente [{cliente.Nome.ToUpper()}] não está correto!");
			}

			if (VerificarExistencia(cliente.CPF, cliente.Id))
			{
				throw new Exception($"Já existe um cliente com o CPF informado!");
			}
			
			cli.Alterar(cliente);

		}

        /// <summary>
        /// Consulta o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public DML.Cliente Consultar(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
			DAL.DaoBeneficiario ben = new DAL.DaoBeneficiario();

			var obj = cli.Consultar(id);
			obj.Beneficiarios = ben.Consultar(obj.Id);

			return obj;
        }

        /// <summary>
        /// Excluir o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.Excluir(id);
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Listar()
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Listar();
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Pesquisa(iniciarEm,  quantidade, campoOrdenacao, crescente, out qtd);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        private bool VerificarExistencia(string CPF, long idCliente)
        {
			var strCpf = CPF.Replace(".", "").Replace("-", "");

			DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.VerificarExistencia(strCpf,idCliente);
        }

		public bool VerificarCPFDoBeneficiarioPorCliente(string CPF,long idCliente)
		{
			var strCpf = CPF.Replace(".", "").Replace("-", "");

			DAL.DaoCliente cli = new DAL.DaoCliente();
			return cli.VerificarCPFDoBeneficiarioPorCliente(strCpf, idCliente);
		}
	}
}
