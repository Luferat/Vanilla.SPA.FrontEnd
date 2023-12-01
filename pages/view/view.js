// Aplicativo principal.
function myView() {

    // Define o valor da tag <title>.
    changeTitle(`Exibir`);

    // Lê a sessão e converte o JSON para JavaScript Data Object.
    const viewData = JSON.parse(sessionStorage.viewData);

    // Debug: verifica os dados da sessão.
    console.log(viewData);

    // Limpa a sessão atual.
    // delete sessionStorage.viewData;

    // Conforme a coleção solicitada...
    switch (viewData.collection) {

        // Se é 'items', chama a função 'loadAPIItem()';
        case 'items':
            loadAPIItem(viewData);
            break;

        // Se é 'owners', chama a função 'loadAPIOwner()';
        case 'owners':
            loadAPIOwner(viewData);
            break;
    }

    // Conclui sem fazer mais nada.
    return false;
}

// Função que obtém um 'item' da API.
function loadAPIItem(viewData) {

    // Monta a URL da requisição.
    requestURL = `${app.apiBaseURL}/items/${viewData.id}`;

    // Debug: mostra URL da requisição.
    console.log('Request URL:', requestURL);

    // jQuery: acessa a API.
    $.get(requestURL)

        // jQuery: se deu certo, 'getData' contém os dados vindos da API.
        .done((getData) => {

            // Debug: exibe dados obtidos sa API.
            console.log(getData);

            // Formata o status para 'human readable'.
            if (getData.status == 'on')
                thisStatus = '<span style="color:green">ativo</span>';

            // Formata data de cadastro para BR.
            dateBr = dateISOtoBR(getData.date);

            // Formata a saída para a view.
            var viewHTML = `
             <h3>${getData.name}</h3>
             <ul>
                 <li><strong>ID: </strong>${getData.id}</li>
                 <li><strong>Cadastro: </strong>${dateBr}</li>
                 <li><strong>Descrição: </strong>${getData.description}</li>
                 <li><strong>Localização: </strong>${getData.location}</li>
                 <li><strong>Status: </strong>${thisStatus}</li>
             </ul>                
         `;

            // jQuery: envia HTML para a view.
            $('#viewItem').html(viewHTML);

            // Refatora viewData para obter o proprietário.
            viewData = {
                "origin": "view",
                "collection": "owners",
                "id": getData.owner
            }

            // Debug: verifica os dados refatorados.
            console.log(viewData);

            // Obtém os dados do proprietário deste item.
            loadAPIOwner(viewData);

        })

        // jQuery: se deu erro...
        .fail((error) => {
            console.error('Erro:', error.status, error.statusText, error.responseJSON);
            viewHTML = `<p>Oooops! O registro não pode ser obtido!</p>`;
            $('#viewItem').html(viewHTML);
        });

    for (const key in viewData) // Itera e lima os campos do formulário.
        $('#' + key).val('');

    // Conclui sem fazer mais nada.
    return false;
}

// Função que obtém um 'owner' da API.
function loadAPIOwner(viewData) {

    // Monta URL da requisição.
    requestURL = `${app.apiBaseURL}/owners/${viewData.id}`;

    // Debug: mostra URL da requisição.
    console.log('Request URL:', requestURL);

    // jQuery: acessa a API.
    $.get(requestURL)

        // Se deu certo, 'getData' contém os dados vindos da API.
        .done((getData) => {

            // Debug: exibe dados obtidos sa API.
            console.log(getData);

            // Remove a senha antes de exibir.
            delete getData.password;

            // Formata o status para 'human readable'.
            if (getData.status == 'on')
                thisStatus = '<span style="color:green">ativo</span>';

            // Formata data de cadastro para BR.
            dateBr = dateISOtoBR(getData.date);

            // Formata data de bascimento para BR.
            birthBR = dateISOtoBR(getData.birth);

            // Formata a saída para a view.
            var viewHTML = `
             <h3>${getData.name}</h3>
             <ul>
                 <li><strong>ID: </strong>${getData.id}</li>
                 <li><strong>Cadastro: </strong>${dateBr}</li>
                 <li><strong>E-mail: </strong>${getData.email}</li>
                 <li><strong>Nascimento: </strong>${birthBR}</li>
                 <li><strong>Status: </strong>${thisStatus}</li>
             </ul>
             <h3>Todos os items de ${getData.name}</h3>
             <ul id="ownerItems"></ul>           
         `;

            // jQuery: envia para a view.
            $('#viewOwner').html(viewHTML);

            // Obtém todos os item do owner.
            getAllItemsFromOwner(getData.id);

        })

        // Se deu erro.
        .fail((error) => {
            console.error('Erro:', error.status, error.statusText, error.responseJSON);
            var viewHTML = `<p>Oooops! O registro não pode ser obtido!</p>`;
            $('#viewOwner').html(viewHTML);
        });

    // Conclui sem fazer mais nada.
    return false;
}

// Função que obtém todos os item do owner.
function getAllItemsFromOwner(ownerId) {

    // Monta URL da requisição.
    requestURL = `${app.apiBaseURL}/owners/items/${ownerId}`;

    // Debug: URL da requisição.
    console.log(requestURL);

    // jQuery: acessa a API.
    $.get(requestURL)

        // Se deu certo, 'getData' contém os dados vindos da API.
        .done((getData) => {

            // Lista de items vazia.
            viewHTML = '';

            // Debug: dados vindos da API.
            console.log("All items:", getData);

            // Itera cada item obtido.
            getData.forEach((data) => {

                // Monta a view.
                viewHTML += `<li class="items" data-id="${data.id}">${data.name}</li>`;

            });

            // jQuery: exibe a view.
            $('#ownerItems').html(viewHTML);

            // jQuery: monitora cliques nos itens da lista.
            $('.items').click(getClickedItem);

        })

        // Se deu erro.
        .fail((error) => {
            console.error('Erro:', error.status, error.statusText, error.responseJSON);
            var viewHTML = `<p>Oooops! Este usuário não tem itens!</p>`;
            $('#ownerItems').html(viewHTML);
        });

    // Conclui sem fazer mais nada.
    return false;

}

// jQuery: roda o aplicativo principal quando a página estiver pronta.
$(document).ready(myView);