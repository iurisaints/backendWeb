## Instalações:
```
npm install xml2js
npm install cors
npm install express
```

## Funcionamento:

app.js: Cria a conexão com o servidor e está com a configuração dos Métodos HTTP

client.js: Conexão com o front-end com a configuração dos fetches necessários

data.xml: Banco de dados de Recursos da API

index.html: Front-end

Fluxo da aplicação: 
index.html > client.js > app.js > data.xml > client.js > index.html