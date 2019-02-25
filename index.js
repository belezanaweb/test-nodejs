/*

- Para facilitar os testes não coloquei nenhum tipo de controle de acesso (JWT ou OAuth);
- Para manter a performance dessa aplicação será necessário aplicar uma solução Elastic (Como Elasticsearch);
- Apliquei os teste somente na camada de negocio. Não cobre aplicação inteira, mas cobre o mais critico e reduz o custo com a criação de testes.
- Apliquei só teste como exemplo como seria os demais. Caso queiram mais teste para ver minha lógica é só entrar em contato.

*/

try {
  const path = require('path');
  const express = require('express');
  const bodyParser = require('body-parser');
  const Resource = require(path.resolve('./src/core/Resource'));

  let server = new express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    extended: false
  }));

  (new Resource()).list((resources) => {
    for (let [key, value] of Object.entries(resources)) {
      server.use(`/${key}`, require(value));
      console.info(key, value);
    }
    server.get(`/`, (req, res) => {
      res.send(Object.keys(resources));
    });
    server.listen(3000, () => {
      console.info("\n", Date() + " | Server Started");
    });
  });

  module.exports = server;
} catch (err) {
  console.error(err);
}
