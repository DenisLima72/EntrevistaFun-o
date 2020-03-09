using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {

        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiarios benef = new DAL.DaoBeneficiarios();
            return benef.IncluirBenef(beneficiario);
        }


        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiarios benef = new DAL.DaoBeneficiarios();
            benef.AlterarBenef(beneficiario);
        }

        public List<DML.Beneficiario> Listar(long idCliente)
        {
            DAL.DaoBeneficiarios benef = new DAL.DaoBeneficiarios();
           return benef.ListarBenef(idCliente);
             
        }

        public DML.Beneficiario Consultar(long id)
        {
            DAL.DaoBeneficiarios benef = new DAL.DaoBeneficiarios();
            return benef.ConsultarBenef(id);
        }

        public void Excluir(long id)
        {
            DAL.DaoBeneficiarios benef = new DAL.DaoBeneficiarios();
            benef.ExcluirBenef(id);
        }


        public bool VerificarExistencia(string CPF)
        {
            DAL.DaoBeneficiarios benef = new DAL.DaoBeneficiarios();
            return benef.VerificarExistencia(CPF);
        }
    }
}
