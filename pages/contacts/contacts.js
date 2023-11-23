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

    // Evita reenvio do formulário.
    ev.preventDefault();

    // Variável para armazenar dados vindos do formulário e indo para a API.
    var formJSON = {};

    // Obtém todos os dados do formulário enviado.
    const formData = new FormData(ev.target);

    // Itera campos do formulário.
    formData.forEach((value, key) => {
        // Sanitiza e valida cada campo usando a função '/index.js/stripTags()'.
        formJSON[key] = stripTags(value);

        // Atualiza o campo com valores sanitizados.
        $('#' + key).val(formJSON[key]);
    });

    // Itera campos do formulário.
    for (const key in formJSON)

        // Se algum campo está vazio, retorna para o formulário.
        if (formJSON[key] == '')
            return false;

    // Obtém a data atual da função '/index.js/now()'.
    formJSON.date = now();

    // Valor padrão para o campo 'status'.
    formJSON.status = 'received';

    // Envia dados para a API.
    saveData(formJSON);

    // Termina a função sem fazer mais nada.
    return false;
}

// Aplicativo que envia os dados do formulário para a API.
function saveData(data) {

    // View para feedback ao usuário.
    var feedback;

    // Executa o método POST na URL da API, passando os dados como parâmetro.
    $.post(
        app.apiBaseURL + '/contact/.json',
        JSON.stringify(data)
    )

        // Sucesso.
        .done(() => {
            var firstName = data.name.split(' ')[0];
            feedback = `
                <h3>Olá ${firstName}!</h3>
                <p>Seu contato foi enviado com sucesso.</p>
                <p>Obrigado...</p>
            `;
        })

        // Falhou.
        .fail((error) => {
            feedback = `
                <h3>Oooops!</h3>
                <p>Não foi possível enviar seu contato. Ocorreu uma falha no servidor.</p>
                <p><em>${error}</em></p>
            `;
        })

        // Sempre.
        .always(() => {

            // Limpa os campos do formulário.
            for (const key in data)
                $('#' + key).val('');

            // Exibe feedback.    
            $('#contacts').html(feedback);
        })
}

// Aplicativo que 'monta' a lista de redes sociais.
function makeSocialList() {

    // Itera lista de redes sociais.
    app.socialList.forEach(item => {

        // Monta cada item das redes sociais em 'htmlSocialList'.
        htmlSocialList += `
            <a href="${item.href}" target="_blank" title="${item.title}">
                <i class="${item.icon}"></i>
            </a>
        `;
    });

    // Evia a lista para a view.
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

// Executa o Aplicativo javaScript quando o documento estiver pronto.
$(document).ready(myContacts)