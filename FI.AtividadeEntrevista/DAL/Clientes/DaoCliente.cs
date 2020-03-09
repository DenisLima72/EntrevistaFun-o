﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FI.AtividadeEntrevista.DML;

namespace FI.AtividadeEntrevista.DAL
{
    /// <summary>
    /// Classe de acesso a dados de Cliente
    /// </summary>
    internal class DaoCliente : AcessoDados
    {
		/// <summary>
		/// Inclui um novo cliente
		/// </summary>
		/// <param name="cliente">Objeto de cliente</param>
		internal long Incluir(DML.Cliente cliente)
		{
			long ret = 0;

			using (System.Data.SqlClient.SqlConnection conexao = ObterConexao()) {

				conexao.Open();
				System.Data.SqlClient.SqlCommand comando = conexao.CreateCommand();

				System.Data.SqlClient.SqlTransaction transacao = conexao.BeginTransaction("IncluirCliente");

				comando.Connection = conexao;
				comando.Transaction = transacao;

				try
				{
					comando.CommandType = CommandType.StoredProcedure;
					comando.CommandText = "[FI_SP_IncClienteV2]";

					comando.Parameters.AddWithValue("@Nome", cliente.Nome);
					comando.Parameters.AddWithValue("@Sobrenome", cliente.Sobrenome);
					comando.Parameters.AddWithValue("@CPF", cliente.CPF);
					comando.Parameters.AddWithValue("@Nacionalidade", cliente.Nacionalidade);
					comando.Parameters.AddWithValue("@CEP", cliente.CEP);
					comando.Parameters.AddWithValue("@Estado", cliente.Estado);
					comando.Parameters.AddWithValue("@Cidade", cliente.Cidade);
					comando.Parameters.AddWithValue("@Logradouro", cliente.Logradouro);
					comando.Parameters.AddWithValue("@Email", cliente.Email);
					comando.Parameters.AddWithValue("@Telefone", cliente.Telefone);

					var idCliente = comando.ExecuteScalar();

					cliente.Id = (long)idCliente;
					
					foreach (var item in cliente.Beneficiarios)
					{
						comando.Parameters.Clear();
						comando.CommandText = "[FI_SP_IncBenef]";
						comando.Parameters.AddWithValue("@CPF", item.CPF);
						comando.Parameters.AddWithValue("@NOME", item.Nome);
						comando.Parameters.AddWithValue("@IDCLIENTE", cliente.Id);

						comando.ExecuteNonQuery();
					}
					ret = cliente.Id;

					transacao.Commit();

				}
				catch (Exception ex)
				{
					transacao.Rollback();
				}
			}

			return ret;
		}

        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        internal DML.Cliente Consultar(long Id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Id", Id));

            DataSet ds = base.Consultar("FI_SP_ConsCliente", parametros);
            List<DML.Cliente> cli = Converter(ds);

            return cli.FirstOrDefault();
        }

        internal bool VerificarExistencia(string CPF, long idCliente)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", CPF));
			parametros.Add(new System.Data.SqlClient.SqlParameter("ID", idCliente));

			DataSet ds = base.Consultar("FI_SP_VerificaCliente", parametros);

            return ds.Tables[0].Rows.Count > 0;
        }

		internal bool VerificarCPFDoBeneficiarioPorCliente(string CPF,long idCliente)
		{
			List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

			parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", CPF));
			parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", idCliente));

			DataSet ds = base.Consultar("FI_SP_VerificaBenef", parametros);

			return ds.Tables[0].Rows.Count > 0;
		}


		internal List<Cliente> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("iniciarEm", iniciarEm));
            parametros.Add(new System.Data.SqlClient.SqlParameter("quantidade", quantidade));
            parametros.Add(new System.Data.SqlClient.SqlParameter("campoOrdenacao", campoOrdenacao));
            parametros.Add(new System.Data.SqlClient.SqlParameter("crescente", crescente));

            DataSet ds = base.Consultar("FI_SP_PesqCliente", parametros);
            List<DML.Cliente> cli = Converter(ds);

            int iQtd = 0;

            if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
                int.TryParse(ds.Tables[1].Rows[0][0].ToString(), out iQtd);

            qtd = iQtd;

            return cli;
        }



        /// <summary>
        /// Lista todos os clientes
        /// </summary>
        internal List<DML.Cliente> Listar()
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Id", 0));

            DataSet ds = base.Consultar("FI_SP_ConsCliente", parametros);
            List<DML.Cliente> cli = Converter(ds);

            return cli;
        }

        /// <summary>
        /// Altera um cliente já registrado
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
       
		internal long Alterar(DML.Cliente cliente)
		{
			long ret = 0;

			using (System.Data.SqlClient.SqlConnection conexao = ObterConexao())
			{

				conexao.Open();
				System.Data.SqlClient.SqlCommand comando = conexao.CreateCommand();

				System.Data.SqlClient.SqlTransaction transacao = conexao.BeginTransaction("IncluirCliente");

				comando.Connection = conexao;
				comando.Transaction = transacao;

				try
				{
					comando.CommandType = CommandType.StoredProcedure;
					comando.CommandText = "[FI_SP_AltCliente]";

					comando.Parameters.AddWithValue("@Nome", cliente.Nome);
					comando.Parameters.AddWithValue("@Sobrenome", cliente.Sobrenome);
					comando.Parameters.AddWithValue("@CPF", cliente.CPF);
					comando.Parameters.AddWithValue("@Nacionalidade", cliente.Nacionalidade);
					comando.Parameters.AddWithValue("@CEP", cliente.CEP);
					comando.Parameters.AddWithValue("@Estado", cliente.Estado);
					comando.Parameters.AddWithValue("@Cidade", cliente.Cidade);
					comando.Parameters.AddWithValue("@Logradouro", cliente.Logradouro);
					comando.Parameters.AddWithValue("@Email", cliente.Email);
					comando.Parameters.AddWithValue("@Telefone", cliente.Telefone);
					comando.Parameters.AddWithValue("@ID", cliente.Id);

					comando.ExecuteNonQuery();

					foreach (var item in cliente.Beneficiarios)
					{
						comando.Parameters.Clear();
						if (item.Id == 0)
						{
							comando.CommandText = "[FI_SP_IncBenef]";

							comando.Parameters.AddWithValue("@CPF", item.CPF);
							comando.Parameters.AddWithValue("@NOME", item.Nome);
							comando.Parameters.AddWithValue("@IDCLIENTE", cliente.Id);

							comando.ExecuteNonQuery();
						}
						else {
							comando.CommandText = "[FI_SP_AltBenef]";

							comando.Parameters.AddWithValue("@ID", item.Id);
							comando.Parameters.AddWithValue("@CPF", item.CPF);
							comando.Parameters.AddWithValue("@NOME", item.Nome);

							comando.ExecuteNonQuery();
						}
						
					}
					ret = cliente.Id;

					transacao.Commit();

				}
				catch (Exception ex)
				{
					transacao.Rollback();
				}
			}

			return ret;
		}

		/// <summary>
		/// Excluir Cliente
		/// </summary>
		/// <param name="cliente">Objeto de cliente</param>
		internal void Excluir(long Id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();
            parametros.Add(new System.Data.SqlClient.SqlParameter("Id", Id));
            base.Executar("FI_SP_DelCliente", parametros);
        }

        private List<DML.Cliente> Converter(DataSet ds)
        {
            List<DML.Cliente> lista = new List<DML.Cliente>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    DML.Cliente cli = new DML.Cliente();
                    cli.Id = row.Field<long>("Id");
                    cli.CEP = row.Field<string>("CEP");
					cli.CPF = row.Field<string>("CPF");
					cli.Cidade = row.Field<string>("Cidade");
                    cli.Email = row.Field<string>("Email");
                    cli.Estado = row.Field<string>("Estado");
                    cli.Logradouro = row.Field<string>("Logradouro");
                    cli.Nacionalidade = row.Field<string>("Nacionalidade");
                    cli.Nome = row.Field<string>("Nome");
                    cli.Sobrenome = row.Field<string>("Sobrenome");
                    cli.Telefone = row.Field<string>("Telefone");
                    lista.Add(cli);
                }
            }

            return lista;
        }


    }
}
