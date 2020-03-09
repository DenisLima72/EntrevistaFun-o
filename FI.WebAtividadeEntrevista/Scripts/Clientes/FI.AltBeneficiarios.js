
function AtualizaBenef() {
    if (obj) {
        $('#formCadastroBenef #Id').val(obj.Nome);
        $('#formCadastroBenef #Nome').val(obj.Nome);
        $('#formCadastroBenef #CPF').val(obj.CPF);
        $('#formCadastroBenef #IdCliente').val(obj.Nome);
    }

   
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "ID": $this.find("Id").val(),
                "NOME": $(this).find("#Nome").val(),
                "CPF": $(this).find('#CPF').val(),
                "ID": $this.find("IdCliente").val(),
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastroBenef")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
     $('#formCadastroBenef').submit(function (e) {
        e.preventDefault();

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
