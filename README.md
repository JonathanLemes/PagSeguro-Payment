# API-PagSeguro-JavaScript
<p align="left">
  <img src="https://github.com/MikeCodesDotNET/ColoredBadges/blob/master/svg/dev/languages/js.svg" alt="javascript" style="vertical-align:top; margin:4px">
  <img src="https://github.com/MikeCodesDotNET/ColoredBadges/blob/master/svg/dev/frameworks/nodejs.svg" alt="noddejs" style="vertical-align:top; margin:4px">
  <img src="https://github.com/MikeCodesDotNET/ColoredBadges/blob/master/svg/dev/services/npm.svg" alt="npm" style="vertical-align:top; margin:4px">
</p>

## Descrição

API implementada em JavaScript para o ambiente de pagamento recorrente disponibilizado pelo PagSeguro. Através das funções do arquivo <a href="https://github.com/JonathanLemes/API-PagSeguro-JavaScript/blob/master/src/API-PagSeguro.js">src/API-PagSeguro.js</a> as requisições HTTP da <a href="https://dev.pagseguro.uol.com.br/reference/api-recorrencia">API Pagamento Recorrência</a> do PagSeguro são executadas.

---

# Documentação

1. Pagamento Recorrência
    1. <a href="https://github.com/JonathanLemes/API-PagSeguro-JavaScript/blob/master/docs/Pagamento%20Recorrente/Providers%20-%20Fluxo%20b%C3%A1sico.md">Providers - Fluxo básico</a>

---

Um exemplo básico de execução da API está no arquivo <a href="https://github.com/JonathanLemes/API-PagSeguro-JavaScript/blob/master/index.js">index.js</a>. Para executá-lo, basta executar os seguintes comandos no terminal:
```bash
npm install
```
```bash
npm test
```

## Importações
Importe os arquivos <a href="https://github.com/JonathanLemes/API-PagSeguro-JavaScript/blob/master/src/API-PagSeguro.js">src/API-PagSeguro.js</a> e <a href="https://github.com/JonathanLemes/API-PagSeguro-JavaScript/blob/master/credentials.json">credentials.json</a> para seu código JavaScript.
```javascript
const api = require("./src/API-PagSeguro");
const credentials = require("./credentials.json");
```

## Método construtor
O método construtor da API requer a passagem de um parâmetro JSON conforme o <a href="https://github.com/JonathanLemes/API-PagSeguro-JavaScript/blob/master/credentials.json">credentials.json</a>.
```javascript
const API = new api(credentials);
```
### Credenciais

Altere o arquivo <a href="https://github.com/JonathanLemes/API-PagSeguro-JavaScript/blob/master/credentials.json">credentials.json</a> inserindo seu e-mail e token do PagSeguro em suas respectivas variáveis.
>**Nota:** As URLs do arquivo estão para o ambiente real, que pode ser alterado para o ambiente de testes (sandbox) inserindo ".sandbox" após o "ws" de todas as URLs.
>Caso você não saiba gerar um token, basta seguir o tutorial no link: https://www.youtube.com/watch?v=Taaa0H6j5Ug

---

### Criado por: [Jonathan Fillipe Lemes](https://github.com/JonathanLemes/)
