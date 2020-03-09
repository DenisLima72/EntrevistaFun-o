using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.Helpers
{
	public class ValidadorCpf
	{

		private int[] cpf;
		private int dig1;
		private int dig2;

		public bool Validar(string testeCpf)
		{
			var strCpf = testeCpf.Replace(".","").Replace("-","");


			char[] serieChar = new char[11];
			string cpfTeste;
			int cont;
			cpf = new int[11];
			int dig;

			//Converte String em Array de Char
			serieChar = strCpf.ToCharArray();

			//Converte Array de Char em Array de int
			for (int i = 0; i < 11; i++)
			{
				//Converte Char em código Asc Decimal e depois em int      
				cpf[i] = (int)Char.GetNumericValue(serieChar[i]);
				//Console.WriteLine(cpf[i]);

			}

			//Validando Primeiro Digito Verificador
			dig = 0;
			cont = 10;
			dig1 = 10;
			for (int i = 0; i < 9; i++)
			{

				dig += cpf[i] * cont;

				cont--;
			}

			if (dig % 11 == 0 || dig % 11 == 1)
			{
				dig1 = 0;
			}
			else
			{
				dig1 = 11 - (dig % 11);
			}

			cpf[9] = dig1;

			//Validando Segundo Digito Verificador
			dig = 0;
			cont = 11;
			dig2 = 11;
			for (int i = 0; i < 10; i++)
			{
				dig += cpf[i] * cont;
				cont--;
			}

			if (dig % 11 == 0 || dig % 11 == 1)
			{
				dig2 = 0;
			}
			else
			{
				dig2 = 11 - (dig % 11);
			}

			cpf[10] = dig2;

			//Comparação para finalizar validação
			cpfTeste = $"{cpf[0]}{cpf[1]}{cpf[2]}{cpf[3]}{cpf[4]}{cpf[5]}{cpf[6]}{cpf[7]}{cpf[8]}{cpf[9]}{cpf[10]}";

			if (cpfTeste == strCpf)
			{
				return true;
			}
			else
			{
				return false;
			}

		}
	}
}
