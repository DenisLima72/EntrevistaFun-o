var foco = "";
var msgstatus = "";

function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}

function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}

function leech(v) {
    v = v.replace(/o/gi, "0")
    v = v.replace(/i/gi, "1")
    v = v.replace(/z/gi, "2")
    v = v.replace(/e/gi, "3")
    v = v.replace(/a/gi, "4")
    v = v.replace(/s/gi, "5")
    v = v.replace(/t/gi, "7")
    return v
}

function soNumeros(v) {
    return v.replace(/\D/g, "")
}

function telefone(v) {
    v = v.replace(/\D/g, "")                 //Remove tudo o que não é dígito
    v = v.replace(/^(\d\d)(\d)/g, "($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2")    //Coloca hífen entre o quarto e o quinto dígitos
    return v
}

function cpf(v) {
    v = v.replace(/\D/g, "")                    //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    return v
}

function cep(v) {
    v = v.replace(/D/g, "")                //Remove tudo o que não é dígito
    v = v.replace(/^(\d{5})(\d)/, "$1-$2") //Esse é tão fácil que não merece explicações
    return v
}

function cnpj(v) {
    v = v.replace(/\D/g, "")                           //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, "$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2")              //Coloca um hífen depois do bloco de quatro dígitos
    return v
}

function romanos(v) {
    v = v.toUpperCase()             //Maiúsculas
    v = v.replace(/[^IVXLCDM]/g, "") //Remove tudo o que não for I, V, X, L, C, D ou M
    //Essa é complicada! Copiei daqui: http://www.diveintopython.org/refactoring/refactoring.html
    while (v.replace(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/, "") != "")
        v = v.replace(/.$/, "")
    return v
}

function site(v) {
    //Esse sem comentarios para que você entenda sozinho ;-)
    v = v.replace(/^http:\/\/?/, "")
    dominio = v
    caminho = ""
    if (v.indexOf("/") > -1)
        dominio = v.split("/")[0]
    caminho = v.replace(/[^\/]*/, "")
    dominio = dominio.replace(/[^\w\.\+-:@]/g, "")
    caminho = caminho.replace(/[^\w\d\+-@:\?&=%\(\)\.]/g, "")
    caminho = caminho.replace(/([\?&])=/, "$1")
    if (caminho != "") dominio = dominio.replace(/\.+$/, "")
    v = "http://" + dominio + caminho
    return v
}


function EntradaNumerico(evt) {

    var key_code = evt.keyCode ? evt.keyCode :
        evt.charCode ? evt.charCode :
            evt.which ? evt.which : void 0;


    // Habilita teclas <DEL>, <TAB>, <ENTER>, <ESC> e <BACKSPACE>
    if (key_code == 8 || key_code == 9 || key_code == 13 || key_code == 27 || key_code == 46) {
        return true;
    }
    // Habilita teclas <HOME>, <END>, mais as quatros setas de navegação (cima, baixo, direta, esquerda)
    else if ((key_code >= 35) && (key_code <= 40)) {
        return true
    }
    // Habilita números de 0 a 9
    // 48 a 57 são os códigos para números
    else if ((key_code >= 48) && (key_code <= 57)) {
        return true
    }
    return false;
}


function Alertar(strMsg) {
    window.alert(strMsg)
}

function aviso(campo, msg) {
    alert(msg);
    campo.focus();
    campo.select();
    return false;
}


//-------------------------------
function isDigit(c) {
    return ((c >= "0") && (c <= "9"))
}

//-------------------------------
function isEmpty(s) {
    return ((s == null) || (s.length == 0))
}


function RetiraMascara(ObjCPF) {
    return ObjCPF.value.replace(/\D/g, '');
}

//Verifica se CPF é válido
function TestaCPF(campoCPF) {
    var Soma;
    var Resto;
    strCPF = RetiraMascara(pegaObj('CPF'))
    Soma = 0;
    //strCPF  = RetiraCaracteresInvalidos(strCPF,11);
    if (strCPF == "00000000000")
        return false;
    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)))
        return false;
    Soma = 0;
    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11)))
        return false;
    return true;
}

// Recupera uma referência ao objeto com o id especificado
// Funciona primariamente com o DOM, mas também aceita document.all
function pegaObj(id) {
    if (typeof (document.getElementById) != 'undefined')
        return document.getElementById(id);
    else if (document.all) {
        return document.all(id);
    }
}


// Função chamada no evento onKeyDown para evitar que caracteres não numéricos
// sejam inseridos no campo indicado.
// Parâmetros:
// input: referência para o objeto <input> que recebeu o evento
// e: o objeto event
function ajustar_numero(input, e) {

    var k;

    // e.which: explorer, e.keyCode: mozilla
    if (e && e.which)
        k = e.which;
    else
        k = e.keyCode;

    // No IE não essa função não consegue cancelar tabs, BS, DEL, etc, mas no mozilla sim,
    // por isso precisamos deixar passar as teclas de edição.
    // Somente aceita os caracteres 0-9, tab, enter, del e BS
    if (((k < 48) || (k > 57)) && k != 8 && k != 9 && k != 127 && k != 13 && !((k > 34) && (k < 41)) && k != 46) {
        if (e.ctrlKey && (k == 118 || k == 99)) {
            return true;
        }
        else {
            e.returnValue = false;
            return false;
        }
    }

    return true;
}


//function validarCPF(cpf) {
//    var form = pegaObj("formCadastro");
//    if (pegaObj("CPF").value == "") {
//        alert("Por favor, preencha o cpf a ser consultado");
//        pegaObj("CPF").focus();
//        return;
//    }
//    else {

//    }
//}



function FormataCPF() {

    var strValor = pegaObj("CPF").value;
    var strTemp;

    strTemp = strValor.replace(".", "");
    strTemp = strTemp.replace(".", "");
    strTemp = strTemp.replace(".", "");
    strTemp = strTemp.replace("-", "");
    strTemp = strTemp.replace("-", "");

    strValor = strTemp

    if (strValor.length > 9) {
        strValor = strValor.substr(0, 3) + '.' + strValor.substr(3, 3) + '.' + strValor.substr(6, 3) + '-' + strValor.substr(9, 2);
    }
    else if (strValor.length > 6) {
        strValor = strValor.substr(0, 3) + '.' + strValor.substr(3, 3) + '.' + strValor.substr(6, 3);
    }
    else if (strValor.length > 3) {
        strValor = strValor.substr(0, 3) + '.' + strValor.substr(3, 3);
    }

    pegaObj("CPF").value = strValor;
}


function ValidarDados() {

    if (pegaObj("CPF").value.length != 14) {
        alert("Por favor, preencha o CPF somente com os 11 números.");
        pegaObj("CPF").focus();
        return false;
    }

}











