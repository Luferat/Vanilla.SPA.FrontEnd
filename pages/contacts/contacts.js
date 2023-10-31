$(document).ready(myContacts)

function myContacts() {
    changeTitle('Faça contato');
    $('#contacts').submit(sendContact);
}

function sendContact(ev) {
    var feedback;
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

    formJSON.date = now();
    formJSON.status = 'received';

    if (saveData(formJSON)) {
        var firstName = formJSON.name.split(' ')[0];
        feedback = `
            <h3>Olá ${firstName}!</h3>
            <p>Seu contato foi enviado com sucesso.</p>
            <p>Obrigado...</p>
        `;
    } else {
        feedback = `
            <h3>Oooops!</h3>
            <p>Não foi possível enviar seu contato. Ocorreu uma falha no servidor.</p>
            <p><em><code>${data.data.message}</code></em></p>
        `;
    }

    for (const key in formJSON)
        $('#' + key).val('');

    $('#contacts').html(feedback);

    return false;
}

function saveData(data) {
    console.log(data);
    return true;
}