Projeto: API e Frontend de Gerenciamento de Veículos

Este projeto é uma aplicação full-stack para gerenciar informações de veículos. Ele consiste em uma API RESTful construída com Node.js, Express e Sequelize (ORM) para interagir com um banco de dados MySQL, e um frontend interativo desenvolvido em React com TypeScript e estilizado com Tailwind CSS.

O objetivo é fornecer uma solução completa para criar, listar, visualizar detalhes, atualizar e excluir registros de veículos de forma eficiente e com uma interface amigável.
🚀 Funcionalidades
API (Backend)

    CRUD Completo para Veículos:
        POST /vehicles: Cria um novo veículo.
        GET /vehicles: Lista todos os veículos cadastrados.
        GET /vehicles/:id: Retorna os detalhes de um veículo específico.
        PUT /vehicles/:id: Atualiza as informações de um veículo existente.
        DELETE /vehicles/:id: Exclui um veículo.
    Validação de dados básica (nível de ORM).
    Tratamento de erros assíncronos.
    Variáveis de ambiente configuráveis para o banco de dados.

Frontend (React)

    Interface intuitiva para visualização e gerenciamento de veículos.
    Listagem de veículos em formato de tabela.
    Páginas dedicadas para adicionar, editar e visualizar detalhes de veículos.
    Navegação fluida entre as rotas usando react-router-dom.
    Estilização moderna e responsiva com Tailwind CSS.
    Validação básica de formulários no cliente.
    Comunicação com a API RESTful.

💻 Tecnologias Utilizadas (Stack)
Backend

    Node.js: Ambiente de execução JavaScript.
    Express: Framework web para Node.js, usado para construir a API.
    TypeScript: Linguagem de programação superset do JavaScript, para código tipado e mais robusto.
    Sequelize: ORM (Object-Relational Mapper) para interagir com o banco de dados MySQL.
    MySQL: Sistema de gerenciamento de banco de dados relacional.
    dotenv: Para carregar variáveis de ambiente.
    cors: Middleware para habilitar o Cross-Origin Resource Sharing.
    express-async-handler: Para tratamento simplificado de erros em rotas assíncronas.
    ts-node-dev: Para desenvolvimento com recarregamento automático do servidor.

Frontend

    React: Biblioteca JavaScript para construção de interfaces de usuário.
    TypeScript: Para código tipado no frontend.
    Tailwind CSS: Framework CSS utilitário para estilização rápida.
    react-router-dom: Para roteamento de SPA (Single Page Application).
    fetch API: Para comunicação com a API (chamadas HTTP).
    Vite (ou Create React App): Ferramenta de build para o projeto React.

⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes softwares instalados em sua máquina:

    Node.js (versão LTS recomendada, ex: v20.x ou v22.x)
    npm (gerenciador de pacotes do Node.js)
    MySQL Server (localmente ou acessível via rede)
    Um cliente MySQL (opcional, mas útil para visualizar o banco de dados, ex: MySQL Workbench, DBeaver)
    Insomnia ou Postman (opcional, para testar a API diretamente)

🚀 Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.
1. Clonar o Repositório
Bash

git clone <URL_DO_SEU_REPOSITORIO_AQUI>
cd <nome_da_pasta_do_projeto> # Ex: cd rentcars-vehicles-app

2. Configuração do Backend (API)

Navegue até a pasta do backend:
Bash

cd vehicles-api-ts

a. Instalar Dependências
Bash

npm install

b. Configurar Variáveis de Ambiente

Crie um arquivo .env na raiz da pasta vehicles-api-ts com as seguintes variáveis (substitua os valores pelos seus dados do MySQL):
Snippet de código

PORT=3001
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=rentcars_vehicles

c. Configurar o Banco de Dados MySQL

    Certifique-se de que seu servidor MySQL está rodando.
    Crie o banco de dados rentcars_vehicles (ou o nome que você definiu em DB_NAME) no seu MySQL. Você pode fazer isso via linha de comando ou cliente MySQL:
    SQL

    CREATE DATABASE rentcars_vehicles;

    A API usará o Sequelize para criar a tabela vehicles automaticamente na primeira execução.

d. Rodar o Backend em Modo de Desenvolvimento
Bash

npm run dev

A API estará rodando em http://localhost:3001. No terminal, você verá mensagens de sucesso de conexão com o banco de dados e sincronização de modelos.
3. Configuração do Frontend (React)

Abra um novo terminal e navegue até a pasta do frontend:
Bash

cd ../vehicle-frontend # Assumindo que você está na pasta vehicles-api-ts

a. Instalar Dependências
Bash

npm install

b. Rodar o Frontend em Modo de Desenvolvimento
Bash

npm start # Se usou Create React App
# OU
npm run dev # Se usou Vite

O frontend estará disponível em http://localhost:3000 (Create React App) ou http://localhost:5173 (Vite).
🗺️ API Endpoints

A API base está em http://localhost:3001.
Método	Endpoint	Descrição	Corpo da Requisição (Exemplo)	Resposta (Status)

POST	/vehicles	Cria um novo veículo.	{ "brand": "Fiat", "model": "Cronos", "year": 2024, "plate": "BRA4E21", "color": "Branco", "mileage": 100, "price": 105000.00, "status": "available" }	201 Created (Objeto do veículo criado) ou 409 Conflict (se placa já existe), 500 Internal Server Error

GET	/vehicles	Lista todos os veículos.	Nenhum	200 OK (Array de objetos de veículos) ou 500 Internal Server Error

GET	/vehicles/:id	Retorna um veículo por ID.	Nenhum	200 OK 
(Objeto do veículo) ou 404 Not Found, 500 Internal Server Error

PUT	/vehicles/:id	Atualiza um veículo por ID.	{ "price": 102500.00, "status": "rented" } (apenas campos a serem atualizados)	200 OK (Objeto do veículo atualizado) ou 404 Not Found, 409 Conflict (se placa atualizada já existe), 500 Internal Server Error

DELETE	/vehicles/:id	Exclui um veículo por ID.	Nenhum	204 No Content (Sucesso na exclusão), 404 Not Found, 500 Internal Server Error

🖥️ Como Usar o Frontend

Após iniciar o frontend (npm start ou npm run dev), abra seu navegador na URL fornecida (ex: http://localhost:5173/).

    Página Inicial (Lista de Veículos): Você verá uma tabela listando todos os veículos cadastrados.
    Adicionar Novo Veículo: Clique no botão "Adicionar Novo Veículo" e preencha o formulário. Após salvar, você será redirecionado para a lista.
    Ver Detalhes: Na lista, clique no botão "Ver" ao lado de um veículo para visualizar suas informações completas em uma página dedicada.
    Editar Veículo: Na lista, clique no botão "Editar" (ou na página de detalhes, clique em "Editar Veículo") para abrir o formulário preenchido com os dados atuais do veículo. Altere as informações e salve.
    Excluir Veículo: Na lista, clique no botão "Excluir" para remover um veículo.

📁 Estrutura do Projeto

```
.
├── vehicles-api-ts/           # Pasta do Backend (API Node.js)
│   ├── src/
│   │   ├── config/            # Configurações (ex: banco de dados)
│   │   ├── controllers/       # Lógica de manipulação de requisições da API
│   │   ├── database/          # Instância do Sequelize
│   │   ├── models/            # Definição dos modelos Sequelize (ex: Vehicle)
│   │   ├── routes/            # Definição das rotas da API
│   │   ├── index.ts           # Ponto de entrada que carrega variáveis de ambiente
│   │   └── server.ts          # Configuração do servidor Express
│   ├── .env                   # Variáveis de ambiente (ignorado pelo Git)
│   ├── package.json           # Dependências e scripts do backend
│   └── tsconfig.json          # Configuração do TypeScript para o backend
│
└── vehicle-frontend/          # Pasta do Frontend (React)
    ├── public/
    ├── src/
    │   ├── components/        # Componentes reutilizáveis
    │   ├── pages/             # Componentes que representam páginas (List, Form, Details)
    │   │   ├── VehicleList.tsx
    │   │   ├── VehicleForm.tsx
    │   │   └── VehicleDetails.tsx
    │   ├── services/          # Funções para chamadas à API (ex: vehicleService.ts)
    │   ├── types/             # Definições de tipos TypeScript (ex: Vehicle.ts)
    │   ├── App.tsx            # Componente principal do React e rotas
    │   ├── index.css          # Arquivo CSS principal (com Tailwind)
    │   └── main.tsx           # Ponto de entrada da aplicação React
    ├── package.json           # Dependências e scripts do frontend
    ├── tailwind.config.js     # Configuração do Tailwind CSS
    └── tsconfig.json          # Configuração do TypeScript para o frontend
```


🚧 Melhorias Futuras (Ideias)

    Validação de Dados: Implementar bibliotecas de validação mais robustas (ex: Zod, Joi) no backend e no frontend.
    Tratamento de Erros: Middleware de tratamento de erros global no backend e exibição de mensagens de erro mais amigáveis no frontend.
    Autenticação e Autorização: Adicionar sistema de usuários e roles (ex: JWT) para proteger rotas.
    Paginação e Filtros: Implementar paginação e filtros na listagem de veículos para grandes volumes de dados.
    Design Responsivo: Aprimorar o design para diferentes tamanhos de tela.
    Implantação (Deploy): Configurar o deploy da API e do Frontend em serviços de nuvem (Vercel).

📄 Licença

Este projeto está sob a licença MIT.

🧑‍💻 Autor

Vairtles Nehisen 
