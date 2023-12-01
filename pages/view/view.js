function myView() {

    // Define o valor da tag <title>.
    changeTitle(`Exibir`);

    // Ler a sessão e converter para JavaScript.
    const viewData = JSON.parse(sessionStorage.viewData);

    // Debug: verifica os dados da sessão.
    console.log(viewData);

    // Debug: verifica os dados da sessão.
    console.log(viewData);

    // Conforme a coleção...
    switch (viewData.collection) {

        // Se é 'item', chama a função 'loadAPIItem()';
        case 'items':
            loadAPIItem(viewData);
            break;

        // Se é 'owner', chama a função 'loadAPIOwner()';
        case 'owners':
            loadAPIOwner(viewData);
            break;
    }

    // Conclui sem fazer mais nada.
    return false;
}


function loadAPIItem(viewData) {

    // Monta a URL da requisição.
    requestURL = `${app.apiBaseURL}/items/${viewData.id}`;

    // Debug: mostra URL da requisição.
    console.log('Request URL:', requestURL);

    // Acessa a API.
    $.get(requestURL)

        // Se deu certo, 'getData' contém os dados vindos da API.
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

            // Envia para a view.
            $('#viewItem').html(viewHTML);

            // Refatora viewData.
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

        // Se deu erro.
        .fail((error) => {
            viewHTML = `<p>Oooops! O registro não pode ser obtido!</p>`;
            $('#viewItem').html(viewHTML);
        });

    return false;
}

function loadAPIOwner(viewData) {

    // Monta URL da requisição.
    requestURL = `${app.apiBaseURL}/owners/${viewData.id}`;

    // Debug: mostra URL da requisição.
    console.log('Request URL:', requestURL);

    // Acessa a API.
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

            // Envia para a view.
            $('#viewOwner').html(viewHTML);

            // Obtém todos os item do owner.
            getAllItemsFromOwner(getData.id);

        })

        // Se deu erro.
        .fail((error) => {
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
    console.log(requestURL);

    // Acessa a API.
    $.get(requestURL)

        // Se deu certo, 'getData' contém os dados vindos da API.
        .done((getData) => {

            // Lista de items vazia.
            viewHTML = '';

            // Debug.
            console.log("All items:", getData);

            // Itera cada item obtido.
            getData.forEach((data) => {

                // Monta a view.
                viewHTML += `<li>${data.name}</li>`;

            });

            // Exibe a view.
            $('#ownerItems').html(viewHTML);

        })

        // Se deu erro.
        .fail((error) => {
            var viewHTML = `<p>Oooops! Este usuário não tem itens!</p>`;
            $('#ownerItems').html(viewHTML);
        });

}

// Executa o aplicativo JavaScript quando a página estiver toda carregada.
$(document).ready(myView);