// Executa o Aplicativo javaScript quando o documento estiver pronto.
$(document).ready(myContacts)

// nicializa a lista de redes sociais.
var htmlSocialList = '';

// Aplicativo principal.
function myContacts() {
    // Define o título da página.
    changeTitle('Faça contato');

    // Chama a função que monta a lista de redes sociais.
    makeSocialList();

    // Monitora o envio do formulário de contatos.
    $('#contacts').submit(sendContact);

    // Monitora 'mouseover' sobre os ícones das rdes sociais.
    $('.contacts a').mouseover(animeIcon)

    // Monitora 'mouseout' sobre os ícones das redes socias.
    $('.contacts a').mouseout(noAnimeIcon)
}

// Aplicativo que processa o envio do formulário de contatos.
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
        `;
    }

    for (const key in formJSON)
        $('#' + key).val('');

    $('#contacts').html(feedback);

    return false;
}

// Aplicativo que envia os dados do formulário para a API.
function saveData(data) {
    console.log(data);

    // Executa o método POST na URL da API, passando os dados como parâmetro.
    $.post(
        'https://frontendeiros2-default-rtdb.firebaseio.com/contact/.json',
        JSON.stringify(data)
    )
        .done((certo) => {
            console.log('certo:', certo)
            return true;
        })
        .fail((errou) => {
            console.log('errou:', errou)
            return false;
        })
}

// Aplicativo que 'monta' a lista de redes sociais.
function makeSocialList() {
    app.socialList.forEach(item => {
        htmlSocialList += `
            <a href="${item.href}" target="_blank" title="${item.title}">
                <i class="${item.icon}"></i>
            </a>
        `;
    });
    $('#socialList').html(htmlSocialList);
}

// Ativa a  animação do ícone da rede social.
function animeIcon() {
    $(this).children('i').addClass('fa-beat-fade')
}

// Desativa a  animação do ícone da rede social.
function noAnimeIcon() {
    $(this).children('i').removeClass('fa-beat-fade')
}