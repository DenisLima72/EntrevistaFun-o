$('#formAdicionarBeneficiario').submit(function (e) {
    e.preventDefault();

    if (!$('#formAdicionarBeneficiario').valid())
        return;

    const _id = $('#IdBeneficiario').val();
    const _cpf = $('#CPFBeneficiario').val();
    const _nome = $('#NomeBeneficiario').val();
    const _idCliente = obj.Id;

    let jaExisteBeneficiario = VerificarBeneficiarioPorCliente(_cpf, _idCliente);

    if (jaExisteBeneficiario) {
        ModalDialog("Atenção!", "Já existe um beneficiário com o mesmo CPF.");
    }
    else {
        let beneficiarios = sessionStorage.getItem("beneficiarios") == "" ? [] : JSON.parse(sessionStorage.getItem("beneficiarios"));

        let novoBeneficiario = { "Id": 0, "CPFBeneficiario": _cpf, "NomeBeneficiario": _nome, "IdCliente": _idCliente };
        beneficiarios.push(novoBeneficiario);

        sessionStorage.setItem("beneficiarios", JSON.stringify(beneficiarios));

        let contentRow = `<tr><td>${novoBeneficiario.CPFBeneficiario}</td><td>${novoBeneficiario.NomeBeneficiario}</td><td data-toggle="modal" data-target="#MyModal" data-identifier='${novoBeneficiario.CPFBeneficiario}' class='text-center mx-auto'><a href="#" onclick="return getbyID(' + ${novoBeneficiario.Id} +') " class="glyphicon glyphicon-edit"></a> <a href="#" onclick="Delete(' + ${novoBeneficiario.Id} + ')" class="glyphicon glyphicon-remove-circle" data-identifier='${novoBeneficiario.CPFBeneficiario}'></a></td></tr>`;
        $('#tabelaBeneficiarios tbody').append(contentRow);

    }

})

function VerificarBeneficiarioPorCliente(strCPF, idCliente) {
    let resultado = false;
    let cpf = strCPF.replace(/[^0-9]/g, '');

    let beneficiarios = sessionStorage.getItem("beneficiarios") == "" ? [] : JSON.parse(sessionStorage.getItem("beneficiarios"));

    if (beneficiarios.length > 0) {
        beneficiarios.some(function (e) {
            if (e.CPFBeneficiario.replace(/[^0-9]/g, '') == cpf && e.IdCliente == idCliente) {
                resultado = true;
                return true;
            }
        })
    }
    if (!resultado) {
        $.get("/Cliente/VerificarCPFDoBeneficiarioPorCliente", { cpf, idCliente }, function (result) {
            if (result === "True") {
                return true;
            }
            else {
                return false;
            }

        })
    }
    return resultado;

}

function loadData() {
    $.ajax({
        url: "/Beneficiario/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Nome + '</td>';
                html += '<td>' + item.CPF + '</td>';
                html += '<td>' + item.IdCliente + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ') " class="glyphicon glyphicon-edit"></a> <a href="#" onclick="Delete(' + item.Id + ')" class="glyphicon glyphicon-remove-circle"></a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Add() {
    var res = validateAdd();
    if (res == false) {

        return false;
    }
    var empObj = {
        Id: $('#ID').val(),
        Nome: $('#NomeB').val(),
        CPF: $('#CPFB').val(),
        IdCliente: $('#IdClienteB').val()

    };
    $.ajax({
        url: "/Beneficiario/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            Alertar("Beneficiário incluído com sucesso!")
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function getbyID(ID) {
    $('#NomeBeneficiario').css('border-color', 'lightgrey');
    $('#CPFBeneficiario').css('border-color', 'lightgrey');
    $('#IdCliente').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Beneficiario/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#IdBeneficiario').val(result.Id);
            $('#NomeBeneficiario').val(result.Nome);
            $('#CPFBeneficiario').val(result.CPF);
            $('#IdCliente').val(result.IdCliente);
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        Id: $('#IdBeneficiario').val(),
        Nome: $('#NomeBeneficiario').val(),
        CPF: $('#CPFBeneficiario').val(),
        IdCliente: $('#IdCliente').val(),
    };
    $.ajax({
        url: "/Beneficiario/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#IdBeneficiario').val("");
            $('#NomeBeneficiario').val("");
            $('#CPFBeneficiario').val("");
            $('#IdCliente').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Delete(ID) {
    var ans = confirm("Tem certeza?");
    if (ans) {
        $.ajax({
            url: "/Beneficiario/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function clearTextBox() {
    $('#ID').val("");
    $('#Nome').val("");
    $('#CPF').val("");
    $('#IdCliente').val("");
    $('#NomeB').val("");
    $('#CPFB').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Nome').css('border-color', 'lightgrey');
    $('#CPF').css('border-color', 'lightgrey');
    $('#IdCliente').css('border-color', 'lightgrey');
}
function validate() {
    var isValid = true;
    if ($('#NomeBeneficiario').val().trim() == "") {
        $('#NomeBeneficiario').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#NomeBeneficiario').css('border-color', 'lightgrey');
    }
    if ($('#CPFBeneficiario').val().trim() == "") {
        $('#CPFBeneficiario').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CPFBeneficiario').css('border-color', 'lightgrey');
    }
    if ($('#IdCliente').val().trim() == "") {
        $('#IdCliente').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#IdCliente').css('border-color', 'lightgrey');
    }
    return isValid;
}

function validateAdd() {
    var isValid = true;
    if ($('#CPFB').value) {
        $('#CPFB').css('border-color', 'Red');
        Alertar("Favor preencher o CPF do beneficiário.");
        isValid = false;
    }
    else {
        $('#CPFB').css('border-color', 'lightgrey');
    }
    if ($('#NomeB').value == "") {
        $('#NomeB').css('border-color', 'Red');
        Alertar("Favor preencher o nome do beneficiário.");
        isValid = false;
    }
    else {

        $('#NomeB').css('border-color', 'lightgrey');

    }


    return isValid;
}