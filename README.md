# Backend Test

### Resumo de funcionamento
Este microsserviço em NodeJS tem como objetivo:
- Consultar, alterar e remover um produto através do SKU
- Cadastrar um novo produto

### Estrutura de diretórios
```
    .
    ├── server          # Arquivos contendo as configurações gerais do servidor da aplicação
    ├── src             # Aqui estão todos os arquivos fonte
    |   ├── lib             # Arquivos contendo a parte lógica da aplicação
    |   ├── models          # Aqui vão os arquivos responsáveis por persistir os dados
    |   ├── services        # Arquivos que servem como intermediadores entre a camada lógica
    |   ├── utils           # Helpers para auxiliar no tratamento de dados
    |   └── validators      # Validações em geral
    └── test           # Sim, temos testes unitários!
```

### Swagger
Utilizamos [swagger](swagger.yaml) para definições de contrato de todos os endpoints.
Para visualizar: https://editor.swagger.io/

### Instalação
Para executar a aplicação em ambiente local, basta executar os seguintes comandos no terminal: 
```bash
git clone https://github.com/adriano-matsuo/test-nodejs
sudo npm install
npm start # ou npm run dev
```

A aplicação estará rodando em http://localhost:3000.

### Testes
Com a aplicação instalada, para executar os testes unitários, utilize o comando `npm test` no terminal.