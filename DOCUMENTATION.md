# Descrição sobre o projeto

## Framework Awilix

No projeto utilizo o framework Awilix que aplica os principios de Injeção de Dependecia, assim não preciso ficar dando require nos arquivos constantemete e além disso permite injetar as depedencias conforme o contexto.

## Convensões, padronização e dependencias

O projeto usa as conversões de commit: feat para novas funcionalidades, refactor para melhorias, fix para correções, chore quando há alguma alteração não relacionada a aplicação como por exemplo eslint, gitignore, test para implementação de testes, [mais informação](https://www.conventionalcommits.org/en/v1.0.0/)

A padronização e formatação do código são feitas utilizando o eslint, prettier e editorconfig para garantir que toda a escrita de código seja seguindo essas expecificações.

#### Commit Lint e commitizen

Recurso para garantir que escrita de commit sejam de acordo com a convesão e padrão do guia commit conventional

#### Husky

Husky é um recurso/ações para Git Hooks que podem serem lançados antes do commit (pre-commit), antes do push (pre-push) e em outras ocasiões.
Antes de instalar o husky deve ter o git configurado no projeto `git init` e adicionar o husky no projeto `npm install husky --save-dev` ou `yarn add husky --dev`

Adicionando o husky ao git hooks `npx husky install` ou para executar de forma de script `npm pkg set scripts.prepare="husky install"` com o comando `npm run prepare` ou `yarn prepare`.

É importante garantir que as permissões do husky `chmod ug+x .husky/*`, e criar um hook `npx husky add .husky/pre-commit "npm test"`, para testar o hook basta adicionar o(s) arquivos ao commit `git add .husky/pre-commit` e escrever o commit `git commit -m "add pre-commit husky sample"`, com isso o npm test executará antes do commit, dentro do projeto o uso está focado em executar o lint antes do commit `npx husky add .husky/pre-commit "yarn lint"`

#### Jest

Jest é um framework completo para testes e será usado nesse projeto para fazer testes unitários
