/**
 * Este arquivo contém o aplicativo JavaScript principal, o "controller" do aplicativo.
 * Também contém diversas funções necessárias para que o aplicativo principal funcione.
 * Completando, diversas pequenas funções de uso geral que podem ser acessadas de qualquer página.
 **/

/** Inicializa super globais. **/

var app; // Variável global que conterá as configurações do aplicativo.
var header = menu = license = ''; // Variáveis globais com os componentes dinâmicos da 'view'.

// Aplicativo principal.
function runApp() {
    $.get('./config.json') // jQuery: obtém o arquivo 'config.json' com as configurações do aplicativo.
        .done(data => { // jQuery: se deu certo...
            app = data; // Armazena as configurações na global 'app'.
            configureTheme(); // Configura o tema conforme as configurações.

            // A sessão 'path' contém o endereço da página que está sendo acessada atualmente.
            // Essa sessão é gerada pelos códigos da página '404.html'.

            if (sessionStorage.path == undefined) // Se a sessão está vazia...
                path = 'home'; // Define o caminho da página inicial.
            else // Se existe uma página na sessão...
                path = sessionStorage.path; // Obtém o caminho da página atual da sessão.
            delete sessionStorage.path; // Apaga a sessão.
            loadPage(path); // Carrega a página atual.
            $(document).on('click', 'a', routerLink); // jQuery: monitora eventos nas tags <a> e chama o programa 'routerLink()' quando ocorrer.
            $('#search').on('submit', search); // jQuery: se o formulário de busca for enviado, roda o programa 'search()'.
        }).fail((error) => { // jQuery: se falhou...
            console.error('Erro:', error.status, error.statusText, error.responseJSON); // Exibe erro no console.
            alert(`Erro! Arquivo de configuração não encontrado...`); // Exibe uma caixa de alerta para o usuário.
        });
}

// Função que configura o tema conforme as configurações.
function configureTheme() {
    $('link[rel="icon"]').attr('href', app.siteFavicon); // jQuery: aplica o favicon em '<link rel="icon" href="favicon.png">'.

    // Monta o cabeçalho com logotipo e nome do aplicativo na variável global 'header'.
    header = `
        <a href="home" title="${app.siteName}"><img src="${app.siteLogo}" alt="${app.siteName}"></a>
        <h1>${app.siteName}</h1>
    `;

    // Obtém cada item do menu principal.
    app.siteMenu.forEach(item => {

        // Concatena (+=) o HTML de cada novo item do menu principal na variável global 'menu'.
        menu += `
            <a href="${item.href}" title="${item.label}">
                <i class="${item.icon}"></i>
                <span>${item.label}</span>
            </a>
        `;

    }); // Enquanto tiver itens de menu, o forEach vai rodar novamente, adicionando (+=) novos itens no menu.

    let todayYear = new Date().getFullYear(); // Obtém a data atual e extrai o ano.
    if (todayYear == app.siteYear) // Se o ano atual e igual ao ano da licença do site...
        todayYear = ''; // Apaga o ano atual.

    // Se o ano da licença é diferente, mantém e exibe os dois anos.

    // Monta o HTML da licença que ficará no rodapé da página, na variável global 'license'.
    license = `
        &copy; ${app.siteYear} ${todayYear} ${app.siteOwner}
        <small><a href="policies">Políticas de Privacidade</a></small>
    `;

    $('#header').html(header); // jQuery: escreve o 'header' em '<div id="header"></div>'.
    $('#menu').html(menu); // jQuery: escreve o 'menu' em '<div id="menu"></div>'.
    $('#license').html(license); // jQuery: escreve a 'license' em '<div id="license"></div>'.
}

// Programa que processa cliques nos links '<a>'.
function routerLink() {
    var href = $(this).attr('href').trim().toLowerCase(); // jQuery: obtém o valor do atributo 'href' da tag clicada.
    if (href == '#top') { // Se clicou na âncora para o topo da página...
        window.scrollTo(0, 0); // Rola até o topo da página.
        return false; // Sai do programa sem fazer mais nada.
    }
    if ( // Se o link começa com um destes termos...
        href.substring(0, 7) == 'http://' || // 26 OU
        href.substring(0, 8) == 'https://' ||
        href.substring(0, 4) == 'tel:' ||
        href.substring(0, 7) == 'mailto:'
    ) return true; // Sai do programa e devolve o controle ao HTML que acessará o link.
    loadPage(href); // Executa o programa que carrega a página da rota clicada.
    return false; // Sai do programa sem fazer mais nada.
}

// Programa que carrega a página atual em '<div id="content"></div>'.
function loadPage(route, updateURL = true) {

    // A variável local 'page' contém os componentes da página a ser carregada.
    let page = {
        html: `pages/${route}/${route}.html`, // Componente HTML.
        css: `pages/${route}/${route}.css`, // Componente CSS.
        js: `pages/${route}/${route}.js` // Componente JavaScript.
    }

    $.get(page.html) // jQuery: obtém o componente HTML.
        .done(htmlData => { // jQuery: se conseguir...
            $('#pageCSS').attr('href', page.css); // jQuery: carrega o CSS da página lincando em '<link rel="stylesheet" href="null.css" id="pageCSS">'.
            $('#content').html(htmlData); // jQuery: carrega o HTML da página em '<div id="content"></div>'.
            $.getScript(page.js); // jQuery: obtém o JavaScript da página, carrega na memória e roda.
        })
        .fail((error) => { // Se falhar...
            console.error('Erro:', error.status, error.statusText, error.responseJSON);
            loadPage('e404', false); // Carrega a página "Erro 404" (rota 'e404') sem atualizar o endereço no navegador.
        })
    window.scrollTo(0, 0); // Rola a página para o início.
    if (updateURL) // Se pediu para atualizar o endereço no navegador...
        window.history.pushState({}, '', route); // Atualiza o endereço no navegador.
}

// Programa que atualiza o conteúdo da tag '<title>' ao carregar uma nova rota/página.
// Recebe o título da página a ser inserido na tag.
function changeTitle(title = '') {
    let pageTitle = app.siteName + ' - '; // Inclui o nome do aplicativo na tag.
    if (title == '') // Se o título está vazio...
        pageTitle += app.siteSlogan; // Adiciona o slogan à tag.
    else // Se não está vazio...
        pageTitle += title; // Adiciona o título passado à tag.
    $('title').html(pageTitle); // jQuery: Atualiza o valor da tag '<title>'.
    document.title = pageTitle; // Atualiza o título do documento no navegador.
}

// Programa que executa uma busca.
function search() {
    var query = stripTags($("input[name='q']").val()); // jQuery: obtém e filtra o termo a ser buscado.
    console.log(query); // Debug: exibe no console. Será substituído pelo processamento do programa.
    return false; // Sai do programa sem fazer mais nada.
}

// Programa que sanitiza textos.
// Remove as tags '<script>' completamente e extrai somente o conteúdo de todas as outras tags HTML.
function stripTags(htmlText) {
    let div = document.createElement('div'); // Cria um novo elemento <div> no documento.
    div.innerHTML = htmlText.trim().replace(/<script>.*<\/script>/, ''); // Remove qualquer '<script>' usando Regex.
    return div.textContent; // Retorna somente o conteúdo textual das tags HTML.
}

// Obtém a data atual no formato ISO (aaaa-mm-dd hh:ii:ss).
function now() {
    let yourDate = new Date(); // Obtém a data atual do sistema.
    yourDate = new Date(yourDate.getTime() - (yourDate.getTimezoneOffset() * 60 * 1000)); // Ajusta o fuso horário.
    const dateParts = yourDate.toISOString().split('T'); // Separa data (dateParts[0]) e hora (dateParts[1]).
    const timeParts = dateParts[1].split('.')[0]; // Remove os milissegundos da hora.
    return dateParts[0] + ' ' + timeParts; // Retorna a data, um espaço e a hora.
}

// Converte uma data ISO para BR.
function dateISOtoBR(data) {
    var parts = data.split(" "); // Separa data da hora.
    var pDate = parts[0].split('-'); // Separa partes da data.
    var outDate = `${pDate[2]}/${pDate[1]}/${pDate[0]}`; // Remonta a data.
    if (parts[1]) outDate += ` ${parts[1]}`; // Adiciona a hora novamente.
    return outDate; // Retorna data formatada.
}

// Função de uso geral que processa um clique no item de coleção.
function getClickedItem() {

    // jQuery: captura a coleção que foi clicada.    
    var collection = $(this).attr('class');

    // jQuery: captura o 'id' do item clicado.
    var id = $(this).attr('data-id');

    // Debug: Mostra dados do item clicado.
    console.log("Coleção:", collection, "ID:", id);
    console.log("Endpoint:", `/${collection}/${id}`);

    // Cria um JSON com os dados a serem passados para a página 'view'..
    JSONData = {
        "origin": "home",
        "collection": collection,
        "id": id
    }

    // Armazena o JSON no sessionStorage do navegador.
    sessionStorage.viewData = JSON.stringify(JSONData);

    // Carrega a página 'view' para exibir detalhes do registro.
    loadPage('view');

    // Conclui sem fazer mais nada.
    return false;

}

// jQuery: quando o documento estiver na memória, executa 'runApp()'.
$(document).ready(runApp); 