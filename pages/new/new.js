var ownerOptions = '<option value="">-- Selecione --</option>';

function myHome() {
    changeTitle('Novo Documento');
    getOwnersToSelect();
    if (sessionStorage.openTab == undefined)
        sessionStorage.openTab = 'item'
    showTab(sessionStorage.openTab);
    $('#btnNewOwner').click(() => { showTab('owner') });
    $('#btnNewItem').click(() => { showTab('item'); });
    $('.tabs form').submit(sendData);
}

function sendData(ev) {
    ev.preventDefault();

    var formJSON = {};
    const formData = new FormData(ev.target);
    formData.forEach((value, key) => {
        formJSON[key] = stripTags(value);
        $('#' + key).val(formJSON[key]);
    });

    for (const key in formJSON)
        if (formJSON[key] == '')
            return false;

    saveData(formJSON);
    return false;
}

function saveData(formJSON) {
    requestURL = `${app.apiBaseURL}/${formJSON.type}s`;
    delete formJSON.type;

    if (formJSON.ownerName != undefined) {
        formJSON['name'] = formJSON.ownerName;
        delete formJSON.ownerName;
    }

    if (formJSON.itemName != undefined) {
        formJSON['name'] = formJSON.itemName;
        delete formJSON.itemName;
    }

    // jQuery: acessa a API usando AJAX.
    $.ajax({
        type: "POST",
        url: requestURL,
        data: JSON.stringify(formJSON),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
        .done(() => {
            viewHTML = `
                <form>
                    <h3>Oba!</h3>
                    <p>Cadastro efetuado com sucesso.</p>
                    <p>Obrigado...</p>
                </form>
            `;
        })
        .fail((error) => { // Se falhou, mostra feeback.
            console.error('Erro:', error.status, error.statusText, error.responseJSON);
            viewHTML = `
                <form>
                    <h3>Oooops!</h3>
                    <p>Não foi possível realizar o cadastro. Ocorreu uma falha no servidor.</p>
                </form>
            `;
        })
        .always(() => {
            $('.tabBlock').html(viewHTML);
            $('#formNewOwner').trigger('reset');
            $('#formNewItem').trigger('reset');
        });

    return false;
}

function showTab(tabName) {

    $('#formNewOwner').trigger('reset');
    $('#formNewItem').trigger('reset');

    switch (tabName) {
        case 'owner':
            $('#tabOwner').show();
            $('#tabItem').hide();
            $('#btnNewOwner').attr('class', 'active');
            $('#btnNewItem').attr('class', 'inactive');
            sessionStorage.openTab = 'owner';
            break;
        case 'item':
            $('#tabItem').show();
            $('#tabOwner').hide();
            $('#btnNewItem').attr('class', 'active');
            $('#btnNewOwner').attr('class', 'inactive');
            break;
    }

}

function getOwnersToSelect() {

    requestURL = `${app.apiBaseURL}/owners`;

    $.get(requestURL)
        .done((apiData) => {

            apiData.forEach((item) => {
                ownerOptions += `<option value="${item.id}">${item.id} - ${item.name}</option>`;
            });

            $('#owner').html(ownerOptions);
        })
        .fail((error) => {
            console.error('Erro:', error.status, error.statusText, error.responseJSON);
        });

}

$(document).ready(myHome);