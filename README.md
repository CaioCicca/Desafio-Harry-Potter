API do Banco de Dados de Hogwarts
=================================

Bem-vindo à API do Banco de Dados de Hogwarts! Esta API permite gerenciar informações sobre bruxos e varinhas no mundo mágico de Harry Potter.

<img src="/assets/images.jpg">

Funcionalidades
---------------

*   **Gerenciamento de Bruxos**: Criar, ler, atualizar e excluir informações sobre bruxos.
*   **Gerenciamento de Varinhas**: Criar, ler, atualizar e excluir informações sobre varinhas.

Tecnologias Utilizadas
----------------------

*   **Node.js**: Tempo de execução JavaScript para desenvolvimento do lado do servidor.
*   **Express.js**: Framework web para construir APIs com Node.js.
*   **PostgreSQL**: Banco de dados relacional para armazenar informações sobre bruxos e varinhas.
*   **pg**: Cliente PostgreSQL para Node.js para interagir com o banco de dados.

Instalação
----------

1.  Clone este repositório em sua máquina local:

bash

Copy code

`git clone https://github.com/your_username/hogwarts-database-api.git`

2.  Navegue até o diretório do projeto:

bash

Copy code

`cd hogwarts-database-api`

3.  Instale as dependências:

bash

Copy code

`npm install`

4.  Configure seu banco de dados PostgreSQL e ajuste a configuração do banco de dados em `index.js` se necessário.
    
5.  Inicie o servidor:
    

bash

Copy code

`npm start`

O servidor será iniciado em `http://localhost:4000` por padrão.

Pontos de Extremidade da API
----------------------------

### Bruxos

*   **GET /bruxos**: Retorna todos os bruxos ou bruxos filtrados por nome.
*   **GET /bruxos/:id**: Retorna um único bruxo por ID.
*   **POST /bruxos**: Cria um novo bruxo.
*   **PUT /bruxos/:id**: Atualiza um bruxo existente.
*   **DELETE /bruxos/:id**: Exclui um bruxo.

### Varinhas

*   **GET /varinhas**: Retorna todas as varinhas.
*   **GET /varinhas/:id**: Retorna uma única varinha por ID.
*   **POST /varinhas**: Cria uma nova varinha.
*   **PUT /varinhas/:id**: Atualiza uma varinha existente.
*   **DELETE /varinhas/:id**: Exclui uma varinha.

Contribuições
-------------

Contribuições são bem-vindas! Se você encontrar algum bug ou quiser adicionar novas funcionalidades, sinta-se à vontade para abrir uma issue ou enviar uma solicitação pull.

