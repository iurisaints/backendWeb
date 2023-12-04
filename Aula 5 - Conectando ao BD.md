## Conectar ao Banco de Dados

Com o auxílio do pacote mysql2, conectar-se ao banco de dados que criamos anteriormente é uma etapa fácil.

```typescript
import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});
```

Exportamos o objeto de conexão estabelecido para facilitar a definição de operações de banco de dados para diferentes tipos separadamente.

### Definir Operações de Banco de Dados

A seguir, vamos criar funções para operações de criação, localização, localização e atualização para o banco de dados, focando nas operações relacionadas ao tipo de pedido. Observe que escreveremos instruções SQL simples para esta tarefa.

#### Função de Criação (`models/order.ts`)

```typescript
import { BasicOrder, Order, OrderWithDetails } from "../types/order";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (order: BasicOrder, callback: Function) => {
  const queryString = "INSERT INTO ProductOrder (product_id, customer_id, product_quantity) VALUES (?, ?, ?)";

  db.query(
    queryString,
    [order.product.id, order.customer.id, order.productQuantity],
    (err, result) => {
      if (err) { callback(err) };

      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};
```

A função `create` insere um novo registro de pedido na tabela ProductOrder, utilizando o objeto db para consultar o banco de dados. A resposta é tratada em um retorno de chamada.

#### Função FindOne (`models/order.ts`)

```typescript
export const findOne = (orderId: number, callback: Function) => {
  const queryString = `
    SELECT 
      o.*,
      p.*,
      c.name AS customer_name,
      c.email
    FROM ProductOrder AS o
    INNER JOIN Customer AS c ON c.id=o.customer_id
    INNER JOIN Product AS p ON p.id=o.product_id
    WHERE o.order_id=?`;

  db.query(queryString, orderId, (err, result) => {
    if (err) { callback(err) }

    const row = (<RowDataPacket>result)[0];
    const order: OrderWithDetails = {
      orderId: row.order_id,
      customer: {
        id: row.cusomer_id,
        name: row.customer_name,
        email: row.email
      },
      product: {
        id: row.product_id,
        name: row.name,
        description: row.description,
        instockQuantity: row.instock_quantity,
        price: row.price
      },
      productQuantity: row.product_quantity
    };
    callback(null, order);
  });
};
```

A função `findOne` seleciona um registro da tabela ProductOrder com base no ID do pedido, juntando as tabelas necessárias para obter detalhes completos do cliente e do produto incluídos no pedido.

#### Funções FindAll e Update (`models/order.ts`)

```typescript
export const findAll = (callback: Function) => {
  const queryString = `
    SELECT 
      o.*, 
      p.*,
      c.name AS customer_name,
      c.email
    FROM ProductOrder AS o 
    INNER JOIN Customer AS c ON c.id=o.customer_id
    INNER JOIN Product AS p ON p.id=o.product_id`;

  db.query(queryString, (err, result) => {
    if (err) { callback(err) }

    const rows = <RowDataPacket[]>result;
    const orders: Order[] = [];

    rows.forEach(row => {
      const order: OrderWithDetails = {
        orderId: row.order_id,
        customer: {
          id: row.customer_id,
          name: row.customer_name,
          email: row.email
        },
        product: {
          id: row.product_id,
          name: row.name,
          description: row.description,
          instockQuantity: row.instock_quantity,
          price: row.price
        },
        productQuantity: row.product_quantity
      };
      orders.push(order);
    });
    callback(null, orders);
  });
};

export const update = (order: Order, callback: Function) => {
  const queryString = `UPDATE ProductOrder SET product_id=?, product_quantity=? WHERE order_id=?`;

  db.query(
    queryString,
    [order.product.id, order.productQuantity, order.orderId],
    (err, result) => {
      if (err) { callback(err) }
      callback(null);
    }
  );
};
```

Essas funções implementam operações de banco de dados relacionadas a pedidos, utilizando instruções SQL simples e tratando as respostas por meio de callbacks.
