// Aplicativo principal.
function myHome() {

    // Define o valor da tag <title>.
    changeTitle();

    // Debug: mostra se este JavaScript funciona.
    console.log('home funciona');

    // Limpa a sessão atual.
    delete sessionStorage.viewData;

    // Obtém todos os 'item'.
    getAll('/items', '#tableItem');

    // Obtém todos os 'owner'.
    getAll('/owners', '#tableOwner');

    // Conclui sem fazer mais nada.
    return false;

}

// Função que obtém os dados da API e exibe, formatados, na view.
function getAll(endPoint, tableId) {

    // View da tabela.
    var tableData = '';

    // jQuery: acessa o endpoint da API.
    $.get(app.apiBaseURL + endPoint)

        // jQuery: se deu certo.
        .done((apiData) => {

            // Debug: exibe dados da API no console.
            console.log("API Data:", apiData);

            // Conta quantos registros retornaram da API.
            const numItems = Object.keys(apiData).length;

            // Obtém a classe dos itens da tabela correspondente.
            // Apenas remove o "/" de "endPoint".
            tdClass = endPoint.replace('/', '');

            // Itera cada registro que retornou da API.
            for (const id in apiData) {

                // Obtém o registro atual para 'item'.
                const item = apiData[id];

                // Monta a 'view' da tabela.
                tableData += `
                        <tr>
                            <td class="${tdClass}" data-id="${item.id}">
                                ${item.name}
                            </td>
                        </tr>                   
                    `;
            }

            // Exibe o total de registros na tabela.
            tableData += `<tr><td>Total de ${numItems} registros.</td></tr>`;

            // jQuery: envia a 'view' para a página, e exibe no elemento <tbody> da tabela correspondente.
            $(tableId + ' tbody').html(tableData);

            // jQuery: monitora cliques nos itens das células da tabela.
            $('.' + tdClass).click(getClickedItem);

        })

        // jQuery: se falhou ou ler a API...
        .fail((error) => {
            // Debug: exibe mensagem de erro completa no console.
            console.error('Erro:', error.status, error.statusText, error.responseJSON);
            // Monta e exibe uma mensagem de erro dentro da tabela correspondente.
            tableData = '<tr><td>Nenhum registro encontrado.</td></tr><tr><td>${error}</td></tr>';
            $(tableId + ' tbody').html(tableData);
        })

    // Conclui sem fazer mais nada.
    return false;
}

// jQuery: roda o aplicativo principal quando a página estiver pronta.
$(document).ready(myHome);