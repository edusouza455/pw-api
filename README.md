# Testes de API com Playwright

Este projeto foi criado com o objetivo de estudar e aplicar testes de API utilizando o framework Playwright. 
O foco principal é aprimorar a arquitetura do projeto de testes e melhorar a performance de execução.

## Tecnologias Utilizadas

- Playwright Test
- Faker.js (para geração de dados dinâmicos)
- GitHub Actions (para CI/CD)

## Arquitetura e Melhorias Aplicadas

O projeto foi refatorado para adotar boas práticas de desenvolvimento, incluindo:
- Centralização de requisições de setup em arquivos de suporte (Helpers), aplicando o princípio DRY.
- Escrita de logs de dados gerados em tempo de execução para melhor rastreabilidade.
- Validações consistentes focadas no comportamento esperado da API (GoRest).
- Pipeline de integração contínua rodando testes em paralelo.

## Como Executar

1. Instale as dependências do projeto:
   `npm install`
2. Crie um arquivo `.env` na raiz do projeto com o seu token de autenticação:
   `GOREST_TOKEN=seu_token_da_api_aqui`
3. Execute os testes:
   `npx playwright test`

## Autor

Criado e desenvolvido por **Eduardo Souza**.
