# Boas vindas ao projeto Cookmaster!

Este projeto foi desenvolvido durante o curso da Trybe com o objetivo de construir uma API utilizando o framework Express, seguindo o padrão de arquitetura MVC. Os requisitos do projeto estão detalhados a seguir.

---

## O que deverá ser desenvolvido

Você vai desenvolver seu primeiro app utilizando a arquitetura MVC!

A aplicação a ser construída trata-se de um cadastro de receitas, onde será possível criar e visualizar receitas, seus ingredientes, e sua forma de preparo.

---

## Desenvolvimento

Você vai desenvolver todas as camadas da aplicação (Models, Views e Controllers) a partir do código deste repositório, que já possui a lógica necessária para realizar login e logout de usuários, bem como um middleware que você pode utilizar em todas as rotas que precisem de autenticação.

Através dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, pros mais íntimos 😜).

Para realizar qualquer tipo de alteração no banco de dados (como cadastro, edição ou exclusão de receitas) será necessário autenticar-se. Para visualizar receitas, a autenticação não é necessária.

O código para cadastro de usuários deve ser criado por você utilizando os conhecimentos adiquiridos nesse bloco.

⚠️ **Dicas Importantes** ⚠️:
- No código deste repositório, utilizamos o middleware `cookie-parser` para realizar a leitura do cookie contendo o token de autenticação. Ele é necessário para que o sistema de login / logout funcione. **Não o remova**!

- Você não precisa alterar a lógica de gerenciamento de sessões (login / logout de usuários).

- No `package.json`, você vai encontrar dois scripts que iniciam sua aplicação: `start` e `start:watch`. O primeiro, apenas inicia o servidor normalmente, enquanto o segundo inicia o servidor e o reinicia a cada alteração no código.

- O arquivo `models/userModel.js` está criado, mas não contém código para conexão com o banco. As funções existentes nele servem para _guardar lugar_ para algumas das funções que você deve criar. O papel de cada uma dessas funções está descrito nos comentários acima delas.

- O middleware `authMiddleware`, presente em `middlewares/auth.js` pode ser usado nas rotas que exigem autenticação.
  - Quando você utiliza o `authMiddleware` em uma rota, ele cria a propriedade `req.user`, que contém as informações do usuário atual, conforme retornadas pelo `userModel`.
  - O `authMiddleware` está disponível no `index.js` da aplicação através de `middlewares.auth`.

- Você pode modificar o layout das views que já existem. No entando, deve garantir que a funcionalidade continua a mesma.

- Nas aulas ao vivo e no conteúdo, você viu como realizar um `INSERT` no banco. Para realizar um `UPDATE` a lógica é a mesma. O que muda são os métodos a serem utilizados para construir o comando que será enviado ao MySQL.

- Quando o atributo `method` de um formulário é definido para `GET`, o navegador utiliza o atributo `name` de cada campo para montar a query string. Isso quer dizer que, se você quiser um atributo chamado `search` na query string, precisa de um input com `name="search"` no seu formulário.

- Toda vez que uma view precisar saber se existe ou não um usuário logado, você pode, no controller, passar o conteúdo de `req.user` para essa view. Depois, na view, basta verificar se esse campo veio preenchido ou não, utilizando algo como `<% if (user) { %> \<\!-- Utiliza os dados do usuário --\> <% } %>`.

- O middleware `authMiddleware` recebe um único parâmetro chamado `required`. Quando verdadeiro, esse parâmetro faz com que uma rota só possa ser acessada por pessoas logadas. Em alguns casos, uma página precisa ter acesso aos dados do usuário, caso essa pessoa esteja logada, mas deve continuar podendo ser acessada por pessoas que não estejam autenticadas. Para esse caso, passe `false` no parâmetro required para a função `authMiddleware`. Ex.: `middlewares.auth(false)`.

### Protótipo e telas

Você pode acessar um protótipo da aplicação com todas as telas (tanto obrigatórias quanto bônus) [neste link](https://www.figma.com/file/CAEkOBX1n3mpVXr4kjgvY8/Project-Cookmaster?node-id=0%3A1).

Não estamos avaliando o **estilo** da página. Cores, tamanhos de texto e afins não serão avaliados.

---

## Requisitos do projeto

### Páginas

#### Funcionalidades de visualização

> Páginas que podem ser acessadas sem login

### 1 - Crie uma tela de listagem de receitas

A página deve ser acessível através da rota principal (`/`).

Para cada receita, deve ser mostrado apenas o nome da receita e o nome da pessoa que cadastrou aquela receita, bem como um link para ver seus detalhes.

Um botão "Nova receita" deve ser exibido **apenas quando houver um usuário logado**.

### 2 - Crie uma tela para visualizar uma receita específica

A tela deve estar diponível no endpoint `/recipes/:id`

Caso o ID da pessoa logada na aplicação seja o mesmo ID da pessoa que criou a receita, um botão "Editar receita" e um outro "Excluir receita" devem ser exibidos na página. Esses botões devem levar a pessoa para as páginas e editar e de excluir receita, respectivamente. Caso não haja nenhuma pessoa logada, nenhum desses botões deve ser exibido.

Esta página deve exibir o título, os ingredientes, e a forma de preparo da receita.

> Dica: esse é um dos casos no qual você pode utilizar o `authMiddleware` passando `false` para o parâmetro `required`, e passar o conteúdo de `req.user` para a view, o que o permitirá determinar se existe um usuário logado e, portanto, se os botões devem ser exibidos.

### 3 - Crie uma página de cadastro de usuários

Um usuário precisa ter os campos ID, E-mail, Senha, Nome e Sobrenome. Todos os campos são obrigatórios. O ID deve ser gerado automaticamente, não devendo ser preenchido pelo usuário no momento do cadastro.

A validação dos campos deve acontecer no backend, e uma mensagem deve ser enviada ao frontend através de uma propriedade passada para o EJS, da mesma forma que acontece com a view `users/login`.

**⚠️ Atenção ⚠️**: O sistema de autenticação espera que as funções `findUserByEmail` e `findUserById` retornem um objeto com, pelo menos, os campos `email`, `password` e `id`. Se você alterar o nome desses campos, precisará alterar o código de login.

#### Funções administrativas

> Páginas que **não** podem ser acessadas sem login. Para essas páginas, utilize o `authMiddleware` sem passar parâmetro algum.

### 4 - Crie uma página de cadastro de receitas

A página deve ser acessível através do endpoint `/recipes/new`, e o formulário deve ser enviado para o endpoint `POST /recipes`

A receita deve ter os campos ID, Nome, Ingredientes, Modo de preparo e Autor. Sinta-se à vontade para modelar o banco da forma que achar melhor. O ID deve ser gerado automaticamente, não devendo ser preenchido no formulário de cadastro de receita.

O campo dos ingredientes pode ser um campo de texto aberto.

### 5 - Crie uma página de edição de receitas

A página deve ser acessível através do endpoint `/recipes/:id/edit`, e o formulário deve ser enviado para o endpoint `POST /recipes/:id`.

Ao carregar, a página já deve conter as informações atuais daquela receita. Você pode utilizar o atributo `value` dos inputs no HTML para preencher esses campos.

Apenas a pessoa que criou a receita deve ter permissão para edita-la. Para verificar isso, você pode utilizar a propriedade `id` localizada em `req.user` (que é criada pelo `authMiddleware`) e compará-la ao ID de quem criou a receita. Caso os IDs não sejam idênticos, a pessoa deve ser redirecionada à página de visualizar receita utilizando o método `res.redirect` no controller.

Caso a edição aconteça com sucesso, a pessoa deve ser redirecionada para a página de visualização daquela receita, já com os dados atualizados.

A validação dos campos deve ser realizada no backend.

**⚠️ Atenção ⚠️**: Lembre-se que a tela não é a única forma de acessar os endpoints. Uma requisição feita utilizando o Postman para o endpoint `POST /recipes/:id` **não deve** alterar o ID da receita ou o nome de quem a cadastrou. Para isso, garanta que não está enviando esses campos ao banco de dados na função de update do seu model de receitas.

### 6 - Crie uma página de exclusão de uma receita

A página deve ser acessível através do endpoint `/recipes/:id/delete`, e só pode ser acessada pela pessoa que cadastrou a receita.

Ao acessar a página, um formulário deve ser exibido, solicitando a senha da pessoa para confirmar a operação. Esse formulário deve ser enviado para o endpoint `POST /recipes/:id/delete`.

A receita só deve ser excluída caso a senha esteja correta. Caso ela esteja incorreta, a pessoa deve ser redirecionada à página de exclusão da receita com a mensagem "Senha incorreta. Por favor, tente novamente".

Caso a receita seja excluída com sucesso, a pessoa deve ser redirecionada à página de listagem de receitas.

### 7 - Cria uma página de pesquisa de receitas

A página deve estar acessível através do endpoint `/recipes/search`.

Um input do tipo texto deve ser exibido juntamente com um botão "Pesquisar". O conteúdo do input deve ser enviado para o endpoint `GET /recipes/search` através do parâmetro `q` na query string.

No backend, o valor do input de texto estará acessível através da propriedade `q` do objeto `req.query`. Caso nada seja informado para pesquisa, a view deve ser renderizada apenas com o campo de pesquisa. Caso um valor seja informado, uma lista semelhante à tela de listar receitas deve ser exibida, contendo o título, nome da pessoa que cadastrou, e um link para cada receita.

Para realizar a pesquisa, o controller de receitas deve solicitar ao model que pesquise por receitas **contendo em seu nome** o valor digitado no input de pesquisa.
