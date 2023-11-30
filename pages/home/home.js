function myHome() {
    changeTitle();
    console.log('home funciona');

    // Obtém todos os 'item'.
    getAll('/items', '#tableItem');

    // Obtém todos os 'owner'.
    getAll('/owners', '#tableOwner');

}

// Função que obtém os dados da API e exibe, formatados, na view.
function getAll(endPoint, tableId) {

    // View da tabela.
    var tableData = '';

    // Acessa o endpoint da API.
    $.get(app.apiBaseURL + endPoint)

        // Se deu certo.
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
            tableData += `<tr><td>Total de ${numItems} registros.</td></tr>`

            // Envia a 'view' para a página, e exibe no elemento <tbody> da tabela correspondente.
            $(tableId + ' tbody').html(tableData);

            // Monitora cliques nos itens das células da tabela.
            $('.' + tdClass).click(getOneData)

        })

        // Se falhou ou ler a API...
        .fail((error) => {

            // Monta e exibe uma mensagem de erro dentro da tabela correspondente.
            tableData = '<tr><td>Nenhum registro encontrado.</td></tr>';
            $(tableId + ' tbody').html(tableData);
        })

    // Termina sem fazer mais nada.
    return false;
}

// Processa clique no item da célula da tabela.
function getOneData() {

    // Captura a coleção que foi clicada.    
    var collection = $(this).attr('class');

    // Captura o 'id' do item clicado.
    var id = $(this).attr('data-id');

    console.log("Coleção:", collection, "ID:", id);
    console.log("Endpoint:", `/${collection}/${id}`);

    // Carrega a página 'view' para exibir detalhes do registro.
    loadPage('view');

}

// Roda o aplicativo quando a página estiver pronta.
$(document).ready(myHome);