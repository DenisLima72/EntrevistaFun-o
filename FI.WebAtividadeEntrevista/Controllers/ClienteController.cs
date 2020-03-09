using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;

namespace WebAtividadeEntrevista.Controllers
{
    public class ClienteController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
		
        public ActionResult Incluir()
        {
			var model = new ClienteModel();
			return View(model);
        }

        [HttpPost]
        public JsonResult Incluir(ClienteModel model)
        {
            BoCliente bo = new BoCliente();
            
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select "*" + error.ErrorMessage).ToList();

				


                Response.StatusCode = 400;
                return Json(string.Join("<br>", erros));
            }
            else
            {

				var cliente = new Cliente()
				{
					CEP = model.CEP,
					CPF = model.CPF,
					Cidade = model.Cidade,
					Email = model.Email,
					Estado = model.Estado,
					Logradouro = model.Logradouro,
					Nacionalidade = model.Nacionalidade,
					Nome = model.Nome,
					Sobrenome = model.Sobrenome,
					Telefone = model.Telefone,
					Beneficiarios = new List<Beneficiario>()
				};
				if (model.Beneficiarios != null && model.Beneficiarios.Count >0) {
					foreach (var item in model.Beneficiarios)
					{
						cliente.Beneficiarios.Add(new Beneficiario { Id = item.Id, CPF = item.CPFBeneficiario, Nome = item.NomeBeneficiario, IdCliente = item.IdCliente });
					}
				}

				try
				{
					model.Id = bo.IncluirCliente(cliente);
				}
				catch (Exception ex)
				{
					return Json(new { status = "ERROR", message = ex.Message });
				}
           
                return Json(new { status = "OK", message = "Cadastro efetuado com sucesso" });
            }
        }

        [HttpPost]
        public JsonResult Alterar(ClienteModel model)
        {
            BoCliente bo = new BoCliente();
       
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select $"* {item.Value.AttemptedValue} - {error.ErrorMessage} <br>").ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
				var cliente = new Cliente()
				{
					Id = model.Id,
					CEP = model.CEP,
					CPF = model.CPF,
					Cidade = model.Cidade,
					Email = model.Email,
					Estado = model.Estado,
					Logradouro = model.Logradouro,
					Nacionalidade = model.Nacionalidade,
					Nome = model.Nome,
					Sobrenome = model.Sobrenome,
					Telefone = model.Telefone,
					Beneficiarios = new List<Beneficiario>()
				};

				if (model.Beneficiarios != null && model.Beneficiarios.Count > 0)
				{
					foreach (var item in model.Beneficiarios)
					{
						cliente.Beneficiarios.Add(new Beneficiario { Id = item.Id, CPF = item.CPFBeneficiario, Nome = item.NomeBeneficiario, IdCliente = item.IdCliente });
					}
				}

				try
				{
					bo.Alterar(cliente);
				}
				catch (Exception ex)
				{
					return Json(new { status = "ERROR", message = ex.Message });
				}

				return Json(new { status = "OK", message = "Cadastro alterado com sucesso" });
            }
        }

        public ActionResult Alterar(long id)
        {
            BoCliente bo = new BoCliente();
            Cliente cliente = bo.Consultar(id);
            Models.ClienteModel model = null;

            if (cliente != null)
            {
				model = new ClienteModel()
				{
					Id = cliente.Id,
					CEP = cliente.CEP,
					CPF = cliente.CPF,
					Cidade = cliente.Cidade,
					Email = cliente.Email,
					Estado = cliente.Estado,
					Logradouro = cliente.Logradouro,
					Nacionalidade = cliente.Nacionalidade,
					Nome = cliente.Nome,
					Sobrenome = cliente.Sobrenome,
					Telefone = cliente.Telefone,
					Beneficiarios = new List<BeneficiarioModel>()
				};
				foreach (var item in cliente.Beneficiarios)
				{
					model.Beneficiarios.Add(new BeneficiarioModel { Id = item.Id, CPFBeneficiario = item.CPF, NomeBeneficiario = item.Nome, IdCliente = item.IdCliente });
				}
            }

            return View(model);
        }

        [HttpPost]
        public JsonResult ClienteList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Cliente> clientes = new BoCliente().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = clientes, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

		public bool VerificarCPFDoBeneficiarioPorCliente(string cpf, long idCliente) {
			var bo = new BoCliente();
			var existe = bo.VerificarCPFDoBeneficiarioPorCliente(cpf, idCliente);

			return existe;
		}
	}
}