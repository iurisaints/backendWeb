# Configurar o ambiente do projeto Node.js

Como de praxe, utilizamos o comando npm init para iniciar nosso projeto Node.js, marcando o início do processo de configuração.

Em seguida, é necessário instalar os pacotes npm que serão utilizados neste projeto. São poucos, portanto, começaremos instalando as dependências do projeto.

```
npm install express body-parser mysql2 dotenv
```

Aqui, empregamos o dotenv para incorporar variáveis de ambiente ao projeto e o mysql2 para gerenciar a conexão com o banco de dados.

Posteriormente, instale o Typescript como uma dependência de desenvolvimento.

```
npm install typescript --save-dev
```

Também é necessário instalar as definições de tipo Typescript para os pacotes utilizados no projeto. Dado que a maioria desses pacotes não dispõe de definições de tipo, fazemos uso do namespace @types npm, onde as definições pertinentes são hospedadas no projeto Definitely Typed.

```
npm install @types/node @types/express @types/body-parser @types/mysql @types/dotenv --save-dev
```

Em seguida, é fundamental inicializar nosso projeto como um projeto Typescript. Para isso, execute o seguinte comando.
```
npx tsc --init
```
Isso adicionará o arquivo tsconfig.json ao seu projeto, o qual empregamos para configurar opções relacionadas ao Typescript no projeto.

Ao abrir o arquivo tsconfig.json, você encontrará diversos códigos comentados. Para nosso projeto, é necessário descomentar as seguintes opções e definir seus valores como indicado abaixo.

```json
"compilerOptions": {
    "target": "es6",   
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
}
```

Essas opções serão levadas em consideração no momento em que o Typescript for compilado para Javascript. O outDir que fornecemos aqui é o local onde os arquivos .js compilados serão armazenados.

Como última etapa, é preciso modificar o script de início no arquivo package.json para compilar o Typescript antes de iniciar o aplicativo Node.

```json
"scripts": {
    "start": "tsc && node dist/app.js"
}
```

O arquivo dist/app.js é a versão compilada do arquivo app.ts que usamos para escrever nosso código.
