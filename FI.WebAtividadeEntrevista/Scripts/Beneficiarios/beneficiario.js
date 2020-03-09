
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
                html += '<td style="display: none;">' + item.Id + '</td>';
                html += '<td>' + item.Nome + '</td>';
                html += '<td>' + item.CPF + '</td>';
                html += '<td style="display: none;">' + item.IdCliente + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ') " class="btn btn-sm-12 btn-primary">ALterar</a> <a href="#" onclick="Delete(' + item.Id + ')" class="btn btn-sm-12 btn-primary">Excluir</a></td>';
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
    var res = true;
    if (res == false) {
        return false;
    }
    var empObj = {
        Id: $('#IDB').val(),
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
function getbyID(Id) {
    $('#NomeA').css('border-color', 'lightgrey');
    $('#CPFA').css('border-color', 'lightgrey');
    $('#IdClienteA').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Beneficiario/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#IDA').val(result.Id);
            $('#NomeA').val(result.Nome);
            $('#CPFA').val(result.CPF);
            $('#IdClienteA').val(result.IdCliente);
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
        Id: $('#IDA').val(),
        Nome: $('#NomeA').val(),
        CPF: $('#CPFA').val(),
        IdCliente: $('#IdClienteA').val(),
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
            $('#IDA').val("");
            $('#NomeA').val("");
            $('#CPFA').val("");
            $('#IdClienteA').val("");
           
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
    $('#IDA').val("");
    $('#NomeA').val("");
    $('#CPFA').val("");
    $('#IdClienteA').val("");
    $('#NomeB').val("");
    $('#CPFB').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#NomeA').css('border-color', 'lightgrey');
    $('#CPFA').css('border-color', 'lightgrey');
    $('#IdClienteA').css('border-color', 'lightgrey');
}
function validate() {
    var isValid = true;
    if ($('#NomeA').val().trim() == "") {
        $('#NomeA').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#NomeA').css('border-color', 'lightgrey');
    }
    if ($('#CPFA').val().trim() == "") {
        $('#CPFA').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CPFA').css('border-color', 'lightgrey');
    }
    if ($('#IdClienteA').val().trim() == "") {
        $('#IdClienteA').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#IdClienteA').css('border-color', 'lightgrey');
    }
    return isValid;
}

function validateAdd() {
    var isValid = true;
    if (pegaObj('CPFB').value == "") {
        $('#CPFB').css('border-color', 'Red');
        Alertar("Favor preencher o CPF do beneficiário.");
        isValid = false;
    }
    else {
        $('#CPFB').css('border-color', 'lightgrey');
    }
    if (pegaObj('NomeB').value == "") {
        $('#NomeB').css('border-color', 'Red');
        Alertar("Favor preencher o nome do beneficiário.");
        isValid = false;
    }
    else {
       
        $('#NomeB').css('border-color', 'lightgrey');
        
    }

   
    return isValid;
}