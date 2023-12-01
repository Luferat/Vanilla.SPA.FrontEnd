// Inicializa a lista de redes sociais usada na barra complementar.
var htmlSocialList = '';

// Inicializa a super global da view.
viewHTML = '';

// Aplicativo principal.
function myContacts() {

    // Define o título da página.
    changeTitle('Faça contato');

    // Monta a lista de redes sociais.
    makeSocialList();

    // jQuery: monitora o envio do formulário de contatos.
    $('#contacts').submit(sendContact);

    // jQuery: monitora 'mouseover' sobre os ícones das redes sociais.
    $('.contacts a').mouseover(animeIcon)

    // jQuery: monitora 'mouseout' sobre os ícones das redes socias.
    $('.contacts a').mouseout(noAnimeIcon)
}

// Função que processa o envio do formulário de contatos.
function sendContact(ev) {
    var feedback; // Contém o feedback para o usuário.
    ev.preventDefault(); // Bloqueia reenvio do formulário.
    var formJSON = {}; // Contém os dados preenchidos.
    const formData = new FormData(ev.target); // Obtém os dados do formulário.
    formData.forEach((value, key) => { // Itera campos do formulário.
        formJSON[key] = stripTags(value); // Sanitiza dados preenchidos no campo e salva em 'formJSON'.
        $('#' + key).val(formJSON[key]); // jQuery: atualiza campo no formulário.
    });

    for (const key in formJSON) // Itera campos do formulário.
        if (formJSON[key] == '') // Se o campo não foi preenchido...
            return false; // Sai sem fazer nada.

    // formJSON.date = now(); // Obtém a data atual para 'formJSON'.
    // formJSON.status = 'received'; // Obtém o status 'default' para 'formJSON'.

    saveData(formJSON); // Envia dados para salvamento.

    // Conclui sem fazer mais nada.
    return false;
}

// Função que envia os dados do formulário para a API.
function saveData(data) {

    // Monta a URL da requisição.
    requestURL = `${app.apiBaseURL}/contacts`;

    // Debug: URL e dados a serem enviados para a API.
    console.log('API:', requestURL);
    console.log('Dados:', data);

    // jQuery: acessa a API usando AJAX.
    $.ajax({
        type: "POST",
        url: requestURL,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
        .done((data) => { // Se deu certo, mostra feedback.
            var firstName = data.name.split(' ')[0]; // Extrai primeiro nome do remetente.
            viewHTML = `
                <h3>Olá ${firstName}!</h3>
                <p>Seu contato foi enviado com sucesso.</p>
                <p>Obrigado...</p>
            `;
        })
        .fail((error) => { // Se falhou, mostra feeback.
            console.error('Erro:', error.status, error.statusText, error.responseJSON);
            viewHTML = `
                <h3>Oooops!</h3>
                <p>Não foi possível enviar seu contato. Ocorreu uma falha no servidor.</p>
            `;
        })
        .always(() => { // Sempre.
            $('#contacts').html(viewHTML);
            $('#contacts').trigger('reset');
        });

    // Conclui sem fazer mais nada.
    return false;

}

// Função que 'monta' a lista de redes sociais.
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

// jQuery: executa o Aplicativo JavaScript quando o documento estiver pronto.
$(document).ready(myContacts)
