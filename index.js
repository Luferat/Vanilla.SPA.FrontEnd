var app;
var header = menu = license = '';

function runApp() {
    $.get('config.json')
        .done(data => {
            app = data;
            configureTheme();
            if (sessionStorage.path == undefined)
                sessionStorage.path = 'home';
            path = sessionStorage.path;
            delete sessionStorage.path;
            loadPage(path);
            $(document).on('click', 'a', routerLink);
            $('#search').on('submit', search);
        }).fail((e) => {
            console.error(e.statusText);
            alert(`Erro! Arquivo de configuração não encontrado...`);
        });
}

function configureTheme() {
    $('link[rel="icon"]').attr('href', app.siteFavicon);
    header = `
        <a href="home" title="${app.siteName}"><img src="${app.siteLogo}" alt="${app.siteName}"></a>
        <h1>${app.siteName}</h1>
    `;
    app.siteMenu.forEach(item => {
        menu += `
            <a href="${item.href}" title="${item.label}">
                <i class="${item.icon} fa-fw"></i>
                <span>${item.label}</span>
            </a>
        `;
    });
    const todayYear = new Date().getFullYear();
    if (todayYear == app.siteYear)
        todayYear = '';
    license = `
        &copy; ${app.siteYear} ${todayYear} ${app.siteOwner}
        <small><a href="policies">Políticas de Privacidade</small>
    `;
    $('#header').html(header);
    $('#menu').html(menu);
    $('#license').html(license);
}

function routerLink() {
    var href = $(this).attr('href').trim().toLowerCase()
    if (
        href.substring(0, 7) == 'http://' ||
        href.substring(0, 8) == 'https://' ||
        href.substring(0, 4) == 'tel:' ||
        href.substring(0, 7) == 'mailto:' ||
        href.substr(0, 1) == '#'
    ) return true;
    loadPage(href);
    return false;
}

function loadPage(route, updateURL = true) {
    let page = {
        html: `pages/${route}/${route}.html`,
        css: `pages/${route}/${route}.css`,
        js: `pages/${route}/${route}.js`
    }
    $.get(page.html)
        .done(htmlData => {
            $('#pageCSS').attr('href', page.css);
            $('#content').html(htmlData);
            $.getScript(page.js);
        })
        .fail(() => {
            loadPage('e404', false);
        })
    window.scrollTo(0, 0);
    if (updateURL)
        window.history.pushState({}, '', route);
}

function changeTitle(title = '') {
    let pageTitle = app.siteName + ' - ';
    if (title == '')
        pageTitle += app.siteSlogan;
    else
        pageTitle += title;
    $('title').html(pageTitle);
    document.title = pageTitle;
}

function search() {
    var query = stripTags($("input[name='q']").val());
    console.log(query);
    return false;
}

function stripTags(htmlText) {
    let div = document.createElement('div');
    div.innerHTML = htmlText.trim().replace(/<script>.*<\/script>/, '');
    return div.textContent;
}

function now() {
    let yourDate = new Date();
    yourDate = new Date(yourDate.getTime() - (yourDate.getTimezoneOffset() * 60 * 1000));
    const dateParts = yourDate.toISOString().split('T');
    const timeParts = dateParts[1].split('.')[0];
    return dateParts[0] + ' ' + timeParts;
}

$(document).ready(runApp);