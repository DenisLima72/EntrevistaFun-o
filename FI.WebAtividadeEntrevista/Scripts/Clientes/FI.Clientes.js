
$(document).ready(function () {
   
    sessionStorage.setItem("beneficiarios", []);

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        if (!$('#formCadastro').valid())
            return;

        let beneficiarios = sessionStorage.getItem("beneficiarios") == "" ? [] : JSON.parse(sessionStorage.getItem("beneficiarios"));
        if (beneficiarios.length > 0) {
            beneficiarios.forEach(function (e) {
                e.CPFBeneficiarios = e.CPFBeneficiarios.replace(/[^0-9]/g, '');
            })
        }

        const viewModel =
        {
            "Nome": $(this).find("#Nome").val(),
            "CPF": $(this).find("#CPF").val().replace(/[^0-9]/g, ''),
            "CEP": $(this).find("#CEP").val(),
            "Email": $(this).find("#Email").val(),
            "Sobrenome": $(this).find("#Sobrenome").val(),
            "Nacionalidade": $(this).find("#Nacionalidade").val(),
            "Estado": $(this).find("#Estado").val(),
            "Cidade": $(this).find("#Cidade").val(),
            "Logradouro": $(this).find("#Logradouro").val(),
            "Telefone": $(this).find("#Telefone").val(),
            "Beneficiarios": beneficiarios
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: viewModel,
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {

                if (r.status == 'OK') {
                    ModalDialog("Sucesso!", r.message)
                    $("#formCadastro")[0].reset();
                    window.location.href = urlRetorno;
                }
                else {
                    ModalDialog("Atenção!", r.message)
                    $('#CPF').focus();
                    
                }
            }
        });

    })

    $("#Telefone").mask("(99) 9999-9999");
    $("#CEP").mask("99999-999");
    $("#CPF").mask("999.999.999-99");
    $("#CPFBeneficiario").mask("999.999.999-99");
})

function ValidarCPF(strCPF) {
    strCPF = strCPF.replace(/[^0-9]/g, '');
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

function VerificarExistenciaPorCPF(strCPF,nId) {
    let cpf = strCPF.replace(/[^0-9]/g, '');
    $.get("/Cliente/VerificaCPF", { cpf, nId }, function (result) {
        if (result === "True") {
            

            return false;
        }
        else {
            return true;
        }

    })
}




function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
