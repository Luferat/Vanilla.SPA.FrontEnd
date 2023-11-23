// Aplicativo principal de 'home'.
function myHome() {

    // Define o título da página.
    changeTitle();

    // Obtém e exibe a lista de 'items' da API e exibe na 'home'.
    getItems('items', '/item.json', '#tableItems');

    // Obtém e exibe a lista de 'owners' da API e exibe na 'home'.
    getItems('proprietários', '/owner.json', '#tableOwners');

}

/**
 * Obtém a lista da API.
 *  Parâmetros:
 *      colectionName → Nome da coleção que aparece na view.
 *      endPoint → Endpointa que obtém os dados da coleção na API.
 *      elementId → Id do elemento da view que recebe a lista.
 **/
function getItems(colectionName, endPoint, elementId) {

    // Prepara a view dos itens.
    var tableData;

    // Monitora cliques nas opções.
    $('.options a').click(optionAction);

    // Obtém os itens da API.
    $.get(app.apiBaseURL + endPoint)

        // Sucesso.
        .done((apiData) => {

            // Número de itens retornados.
            const numItems = Object.keys(apiData).length;

            // Se retornaram itens...
            if (numItems > 0) {

                // Itera os items.
                for (const id in apiData) {

                    // Monta a lista de itens em 'tableData'.
                    if (apiData.hasOwnProperty(id)) {
                        const item = apiData[id];
                        tableData += `
                            <tr>
                                <td>${item.name}</td>
                                <td class="options">
                                    <a href="edit/${id}" title="Editar"><i class="fa-solid fa-pen-to-square fa-fw"></i></a>
                                    <a href="delete/${id}" title="Apagar"><i class="fa-solid fa-trash fa-fw"></i></a>
                                </td>
                            </tr>
                        `;
                    }
                }

                tableData += `<tr><td colspan="2">Total de ${numItems} ${colectionName}.</td></tr>`;

            } else {
                tableData = `<tr><td colspan="2">Não temos ${colectionName} cadastrados!</td></tr>`;
            }
            $(elementId).html(tableData);
        })
}

function optionAction(ev){
    console.log(ev.target);
    return false;
}

// Executa o Aplicativo javaScript quando o documento estiver pronto.
$(document).ready(myHome);