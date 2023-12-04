## Estrutura do Diretório do Projeto

Nosso projeto adota uma estrutura de diretório simples, conforme ilustrado abaixo.

```markdown
.
├── .env
├── package.json
├── tsconfig.json
├── dist/
├── app.ts
├── db.ts
├── models/
├── routes/
└── types/
```

### Criar o arquivo .env

O arquivo `.env` é utilizado para armazenar as variáveis de ambiente do aplicativo.

```env
PORT=3000
DB_HOST="localhost"
DB_USER="username"
DB_PWD="****"
DB_NAME="OnlineStore"
```

Como observado, a maioria das variáveis de ambiente está relacionada ao banco de dados que criamos anteriormente.
