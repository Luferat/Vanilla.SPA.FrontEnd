
# Simple Vanilla SPA

Um site *front-end* experimental, bem simples no paradigma SPA (*Single Page Application*) que pode ser adaptado para diversos *cases* como, por exemplo:

- Um site estático, usando apenas HTML, CSS e JavaScript no *front-end*;
- Consumir um *back-end* com uma API REST;
- Consumir um *back-end* como serviço (BaaS - Back-end as a Service) como o [Firebase](https://firebase.com).

[Clique aqui](https://luferat.github.io/Vanilla.SPA.FrontEnd/) para ver a publicação do branch "main" funcionando.

## Características

 - Código muito simples que pode ser rapidamente adaptado para diversos pequenos cases;
 - Paradigma SPA, onde só temos uma página, diminuindo reloads e consumo de banda;
 - Suporta PWA (*Progressive Web Application*), permitindo a instalação na forma de WebApp;
 - HTML/CSS responsivo;
 - Usa o framework [jQuery](https://jquery.com/) para acessar o DOM;
 - Usa a bilbioteca de ícones [Font Awesome](https://fontawesome.com/);
 - Personalização rápida a partir de um arquivo JSON → `config.json`.
 - ...

## Obtendo

1. Acesse o [GitHub.com](https://github.com/) e logue-se na sua conta;
2. Acesse o repositório original do aplicativo [Vanilla.SPA.FrontEnd](https://github.com/Luferat/Vanilla.SPA.FrontEnd);
3. No menu de ferramentas do repositório, clique em "Fork";
4. Na página **Create a new fork**, marque a opção `Copy the master branch only`;
5. Clique no botão **`[Create fork]`** para criar uma cópia do repositório no seu GitHub.com.
 
## Clonando

1. Abra o aplicativo **Git Bash** no computador local;
2. Se ainda não tem, crie uma pasta raiz para seus projetos comandando `mkdir projects`;
3. Acesse a pasta dos projetos comandando `cd projects`;
4. Acesse o repositório do aplicativo no seu GitHub.com;
5. Clique no botão **`[<> Code ▾]`**;
6. Na guia **Local**, clique em **HTTPS**, selecione e copie o endereço do mesmo repositório;
7. De volta ao **Git Bash**, digite `git clone `;
8. Na mesma linha, cole o endereço do repositório com o botão direito do mouse ou teclando `[Shift]+[Insert]`;
   - Teremos algo como `git clone https://github.com/seuUserName/Vanilla.SPA.FrontEnd.git`.
9. Tecle `[Enter]` para fazer a *clonagem*;
10. Acesse a pasta local comandando `cd Vanilla.SPA.FrontEnd`.

Agora que tem os códigos fonte, pode trabalhar na sua versão do aplicativo.

## Versionando

Sempre que for trabalhar com os códigos fonte, seja para dar manutenção ou gerar uma nova versão, com novos recursos, crie um novo *branch* para identificar as alterações que serão feitas.

> *Branches* funcionam como linhas do tempo alternativas onde você pode mexer e testar os códigos sem alterar a linha do tempo principal (main) até que tenha certeza de que as novas implementações tiveram o resultado esperado.

Para criar um novo branch, no **Git Bash**, digite `git checkout -b 2023.10.30.01`, onde, o último trecho é a identificação da versão que será trabalhada. Você pode obter uma lista resumida de comandos **Git** [aqui](https://gist.github.com/Luferat/ffb0d5c67131c4152ba54f984e26b28d) ou espalhadas pela Internet.

> No exemplo estamos usando o versionamento pela data que é bastante recomendado, mas você pode usar outros formatos.

Para quem tem problemas com comandos, quer melhorar a produtividade ou ambos, sugiro instalar e aprender a usar o aplicativo [GitHub Desktop](https://desktop.github.com/) que é uma interface gráfica para Git e GitHub.com. Ela torna a interação com essas ferramentas um pouco mais amigável e segura.

[Esta playlist](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA) tem um ótimo curso desta ferramenta para quem está começando.

## Rodando o aplicativo localmente
O aplicativo roda em praticamente qualquer servidor Web, mas funciona de forma instável com os que tem "auto-reload" como os "LiveServer" que podemos usar no **VSCode**, por exemplo. Uma sugestão é usar o [http-server](https://github.com/http-party/http-server).

Para instalar o servidor, ainda usando o **Git Bash**, comande `npm install --global http-server`.

Para rodar o aplicativo, acesse a pasta desde (se já não estiver nela), você deve estar exatamente na pasta onde existe o arquivo `index.html`. Então, comande `http-server`.

Para ver o site funcionando, abra o endereço `http://localhost:8080` no navegador. A porta pode ser diferente de `8080`se esta já estiver ocupada por outro aplicativo. Neste caso o `http-server` tentará a porta `8081`, depois `8082` e assim por diante. Na mensagem de execução ele informa a porta operacional.

Também é possível especificar a porta manualmente comandando `http-server -p 8088`, por exemplo. Lembre-se ainda que o **Git Bash** ficará bloqueado até você teclar `[ctrl]+[C]` para interromper o servidor.
