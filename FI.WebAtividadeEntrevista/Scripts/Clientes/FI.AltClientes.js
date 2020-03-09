$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CPF').val(obj.CPF);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);

        let beneficiarios = obj.Beneficiarios;
        

        sessionStorage.setItem("beneficiarios", JSON.stringify(beneficiarios));

        obj.Beneficiarios.forEach(function (e) {
            e.CPFBeneficiario = e.CPFBeneficiario.replace(/[^\d]/g, "");
            e.CPFBeneficiario = e.CPFBeneficiario.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            let contentRow = `<tr><td>${e.CPFBeneficiario}</td><td>${e.NomeBeneficiario}</td><td data-toggle="modal" data-target="#MyModal" data-identifier='${e.CPFBeneficiario}' class='text-center mx-auto'><a href="#" onclick="return getbyID(' + ${e.CPFBeneficiario} + ') " class="glyphicon glyphicon-edit"></a> <a href="#" onclick="Delete(' + ${e.CPFBeneficiario} + ')" class="glyphicon glyphicon-remove-circle" data-identifier='${e.CPFBeneficiario}'></a></td></tr>`;$('#tabelaBeneficiarios tbody').append(contentRow);
        })

    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        let beneficiarios = sessionStorage.getItem("beneficiarios") == "" ? [] : JSON.parse(sessionStorage.getItem("beneficiarios"));

        if (beneficiarios.length > 0) {
            beneficiarios.forEach(function (e) {
                e.CPFBeneficiario = e.CPFBeneficiario.replace(/[^0-9]/g, '');
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
    
    $("#CPF").mask("999.999.999-99");
    $("#CEP").mask("99999-999");
    $("#Telefone").mask("(99) 9999-9999");
    $("#CPFBeneficiario").mask("999.999.999-99");
})

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
