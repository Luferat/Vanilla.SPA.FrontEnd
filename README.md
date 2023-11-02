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
- HTML/CSS responsivo e sem frameworks CSS;
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
2. Digite `pwd` e verifique se o prompt aponta para a pasta do usuário atual, por exemplo:

```git
/c/Users/16129532023.1
```

3. Se ainda não tem, crie uma pasta raiz para seus projetos comandando `mkdir projects`;
4. Acesse a pasta dos projetos comandando `cd projects`;
5. Acesse o repositório do aplicativo no seu GitHub.com;
6. Clique no botão **`[<> Code ▾]`**;
7. Na guia **Local**, clique em **HTTPS**, selecione e copie o endereço do mesmo repositório;
8. De volta ao **Git Bash**, se você está em uma rede com **SSL Self Signed** como a rede escolar, comande:

```git
git config --global http.sslVerify false
```

9.  Agora, digite `git clone` seguido de um espaço;
10. Na mesma linha, cole o endereço do repositório com o botão direito do mouse (*paste*) ou teclando `[Shift]`+`[Insert]`;
       - Teremos algo como `git clone https://github.com/seuUserName/Vanilla.SPA.FrontEnd.git`.
11. Tecle `[Enter]` para fazer a *clonagem*;
12. Acesse a pasta local do projeto comandando `cd Vanilla.SPA.FrontEnd`.

Agora que tem os códigos fonte, pode trabalhar na sua versão do aplicativo. 
Se você tem o [**Visual Studio Code**](https://code.visualstudio.com/docs/?dv=win64user) corretamente instalado e deseja usá-lo, comande `code .`.

## Versionando

Sempre que for trabalhar com os códigos fonte, seja para dar manutenção ou gerar uma nova versão, com novos recursos, crie um novo *branch* para identificar as alterações que serão feitas.

> *Branches* funcionam como linhas do tempo alternativas onde você pode mexer e testar os códigos sem alterar a linha do tempo principal (main) até que tenha certeza de que as novas implementações tiveram o resultado esperado.

Para criar um novo branch, no **Git Bash**, digite `git checkout -b 2023.10.31.01`, onde, o último trecho é a identificação da versão que será trabalhada.
Você pode obter uma lista resumida de comandos **Git** [aqui](https://gist.github.com/Luferat/ffb0d5c67131c4152ba54f984e26b28d) ou espalhadas pela Internet.

> No exemplo estamos usando o versionamento pela data (2023.10.31.01) que é bastante recomendado, mas você pode usar outros formatos.

Ao concluir as atividades, faça **commit** das alterações comandando no **Git Bash**:

```git
git commit -a -m "Versão atualizada do aplicativo"
```

Onde, "Versão atualizada do aplicativo" pode ser trocado por uma mensagem mais explicativa sobre as alterações deste branch.

Se este *branch* contém uma tarefa concluída e pode ser integrado ao aplicativo principal, faça o seguinte:

- Publique o *branch* atual no repositório **Origin** (GitHub.com neste caso), comandando:
  - Lembre-se de trocar `2023.10.31.01` pelo nome do branch atual.
  - Neste momento, pode ocorrer do *Git* solicitar que você faça login no *GitHub.com*, apenas clique em `[Continue with browser]` ou algo similar.

```git
git push --set-upstream origin 2023.10.31.01
```

- Mude para o branch do aplicativo principal, `main` ou `master`, comandando `git checkout main` ou `git checkout master`;
- Faça o *merge* do *branch* principal com o branch mais recente, comandando `git merge 2023.10.31.01`;
- Finalmente, publique o *branch* principal, comandando `git push`.

> Para quem tem problemas com comandos, quer melhorar a produtividade ou ambos, sugiro instalar e aprender a usar o aplicativo [GitHub Desktop](https://desktop.github.com/) que é uma interface gráfica para Git e GitHub.com. 
> Ela torna a interação com essas ferramentas um pouco mais amigável e segura.
> [Nesta playlist](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA) tem um ótimo curso desta ferramenta para quem está começando.

## Rodando o aplicativo localmente

O aplicativo roda em praticamente qualquer servidor Web, mas funciona de forma instável com os que tem "auto-reload" como os "LiveServer" que podemos usar no **VSCode**, por exemplo.
Uma sugestão é usar o [http-server](https://github.com/http-party/http-server).

Para instalar o servidor, ainda usando o **Git Bash**, comande `npm install --global http-server`.

Se o comando `npm install` acima falhar porque você está em uma rede com **SSL Self-Signed**, como na rede escolar, insira cada um dos comandos abaixo e depois, tente o `npm install` novamente:

```git
npm config set strict-ssl false
set NODE_TLS_REJECT_UNAUTHORIZED=0
```

Para rodar o aplicativo, acesse a pasta desde (se já não estiver nela), você deve estar exatamente na pasta onde existe o arquivo `index.html`. Então, comande `http-server`.

Para ver o site funcionando, abra o endereço `http://localhost:8080` no navegador. 
A porta pode ser diferente de `8080`, se esta já estiver ocupada por outro aplicativo.
Neste caso o `http-server` tentará a porta `8081`, depois `8082` e assim por diante.
Na mensagem de execução ele informa a porta operacional.

Também é possível especificar a porta manualmente comandando `http-server -p 8088`, por exemplo. 
Lembre-se ainda que o **Git Bash** ficará bloqueado até você teclar `[ctrl]`+`[C]` para interromper o servidor.

## Encerrando as atividades do dia

Se você não está na sua estação de trabalho particular, uma vez que os *branch* foram atualizados no **Origin** e você já encerrou as atividades com a *IDE*, faça logout em todas as plataformas que você usou:

### No navegador

Tecle `[Ctrl]`+`[Shift]`+`[Delete]` para remover todos os dados de navegação possíveis, *sem dó nem piedade*;

### No Git

O Git não mantém sessões ativas da mesma forma que as plataformas online, como o GitHub.com.
O Git lida com a autenticação em um nível mais local.
Se você deseja fazer logout ou alterar as credenciais que o Git usa localmente, siga estas etapas:

#### No Windows:

- Abra o "Gerenciador de Credenciais" no Painel de Controle.
- Em "Credenciais do Windows", você encontrará as credenciais armazenadas para o Git. Você pode removê-las daqui.

#### No macOS:

- Abra o "Acesso às Chaves" (Keychain Access) na pasta "Utilitários".
- Procure as credenciais relacionadas ao Git e remova-as.

#### No Linux:

- No Linux, as credenciais geralmente são armazenadas no arquivo ~/.git-credentials.
- Você pode editar esse arquivo manualmente para remover as credenciais.

Além disso, você pode configurar o Git para usar credenciais específicas para um repositório, o que permite que você "troque" de conta ao clonar ou trabalhar em diferentes repositórios.
Para fazer isso, use os comandos:

- Para configurar um nome de usuário e e-mail específicos para um repositório:

```git
git config --local user.name "Seu Nome"
git config --local user.email "seu@email.com"
```

- Para configurar um nome de usuário específico para um repositório:

```git
git config --local credential.username "SeuNomeDeUsuário"
```

Isso permitirá que você mude as credenciais de usuário em um repositório específico sem afetar globalmente as configurações do Git.

Lembre-se de que o Git não mantém uma sessão ativa como uma plataforma online, então a autenticação é feita localmente e depende das configurações do Git e do sistema operacional.
