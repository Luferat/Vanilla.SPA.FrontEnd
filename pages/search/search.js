// Inicializa a expressão de busca.
var query = '';

// Inicializa a view.
var htmlView = '';

function myAbout() {

    // Título da página.
    changeTitle(`Resultados da busca`);

    // Se está buscando alguma coisa...
    if (sessionStorage.search != undefined) {

        // Obtém o termo a ser buscado.
        query = sessionStorage.search

        // Endereço da requisição.
        requestURL = `${app.apiBaseURL}/items/search/${query}`;

        htmlView = '<ul>';

        $.get(requestURL)
            .done((apiData) => {
                apiData.forEach(item => {
                    htmlView += `<li class="items" data-id="${item.id}">${item.name}</li>`
                });
            })
            .fail()
            .always(()=>{
                htmlView += `</ul>`;
                $('#results').html(htmlView);
                $('.items').click(getClickedItem);
            });

    }

}

$(document).ready(myAbout);