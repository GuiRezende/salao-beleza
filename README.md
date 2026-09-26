# Salão Beleza - Backend

API REST do sistema Salão Beleza, desenvolvida com Node.js e MongoDB.

## Pré-requisitos

- Node.js 22 ou superior e npm, para executar pela IDE.
- Docker Desktop com Docker Compose, para executar em container.
- Uma instância MongoDB acessível pela aplicação (por exemplo, MongoDB Atlas).

## Configuração

Na raiz do projeto, crie um arquivo `.env` com a string de conexão do MongoDB:

```env
DB_CONNECTION_STRING=mongodb+srv://<usuario>:<senha>@<cluster>/<database>?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
```

Substitua os valores entre `<...>` pelos dados da sua instância. `FRONTEND_URL` é opcional; quando omitida, a API permite por padrão a origem `http://localhost:5173`. Para permitir mais de uma origem, separe as URLs por vírgula.

Não compartilhe nem versione o arquivo `.env`, pois ele pode conter credenciais.

## Executar pela IDE

1. Abra a pasta do projeto na IDE (por exemplo, VS Code).
2. Crie e preencha o arquivo `.env` conforme a seção de configuração.
3. Abra o terminal integrado na raiz do projeto e instale as dependências:

   ```bash
   npm ci
   ```

4. Inicie a API em modo de desenvolvimento, com reinicialização automática ao alterar arquivos:

   ```bash
   npm run dev
   ```

   Para executar sem o modo de desenvolvimento, use `npm start`.

Ao iniciar, a API fica disponível em `http://localhost:8000`. Encerre o processo com `Ctrl+C` no terminal.

## Executar com Docker Compose

Com o Docker Desktop aberto e o arquivo `.env` criado na raiz, execute:

```bash
docker compose up --build
```

O Compose constrói a imagem e inicia a API na porta `8000`. Para iniciar em segundo plano, acrescente `-d`:

```bash
docker compose up --build -d
```

Para acompanhar os logs:

```bash
docker compose logs -f app
```

Para parar e remover o container:

```bash
docker compose down
```

O serviço usa o modo de desenvolvimento e monta os arquivos do projeto no container. As alterações são observadas pelo Nodemon.

## Rotas da API

A URL base local é `http://localhost:8000`. As rotas disponíveis são:

- `/servico`
- `/cliente`
- `/profissional`
- `/fila-espera`
- `/agendamento`
- `/pagamento`

Consulte os arquivos da coleção em `collection/Collection-CRUD-Salao-Beleza.json` para exemplos de requisições `GET/POST/PATCH/DELETE`.