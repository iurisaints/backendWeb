## Implementar os Gerenciadores de Rotas

Na próxima etapa, implementaremos os manipuladores de rotas para o endpoint /orders. Você pode seguir este padrão para implementar endpoints como /customers e /products posteriormente.

Para a nossa API REST, definiremos 4 endpoints para receber solicitações do lado do cliente.

- Obter todos os objetos de pedido
  - `GET /orders/`
  
- Criar um novo pedido
  - `POST /orders/`

- Obter um pedido pelo ID do pedido
  - `GET /orders/:id`

- Atualizar o pedido dado pelo ID do pedido
  - `PUT /orders/:id`

Usaremos o roteador express para definir as rotas, utilizando caminhos relativos à rota /orders.

Vamos adicionar a lógica de tratamento de rota ao arquivo `orderRouter.ts`.

```typescript
import express, { Request, Response } from "express";
import * as orderModel from "../models/order";
import { Order, BasicOrder } from "../types/order";
const orderRouter = express.Router();

orderRouter.get("/", async (req: Request, res: Response) => {
  orderModel.findAll((err: Error, orders: Order[]) => {
    if (err) {
      return res.status(500).json({ "errorMessage": err.message });
    }

    res.status(200).json({ "data": orders });
  });
});

orderRouter.post("/", async (req: Request, res: Response) => {
  const newOrder: BasicOrder = req.body;
  orderModel.create(newOrder, (err: Error, orderId: number) => {
    if (err) {
      return res.status(500).json({ "message": err.message });
    }

    res.status(200).json({ "orderId": orderId });
  });
});

orderRouter.get("/:id", async (req: Request, res: Response) => {
  const orderId: number = Number(req.params.id);
  orderModel.findOne(orderId, (err: Error, order: Order) => {
    if (err) {
      return res.status(500).json({ "message": err.message });
    }
    res.status(200).json({ "data": order });
  });
});

orderRouter.put("/:id", async (req: Request, res: Response) => {
  const order: Order = req.body;
  orderModel.update(order, (err: Error) => {
    if (err) {
      return res.status(500).json({ "message": err.message });
    }

    res.status(200).send();
  });
});

export { orderRouter };
```

### Juntar Tudo em `app.ts`

Agora, concluímos a adição da lógica interna da nossa API. A única coisa que resta a fazer é reunir tudo no arquivo `app.ts`, o ponto de entrada para nossa API, e criar o servidor que escuta e responde às solicitações.

```typescript
import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { orderRouter } from "./routes/orderRouter";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/orders", orderRouter);

app.listen(process.env.PORT, () => {
  console.log("Node server started running");
});
```

E é isso! Criamos nossa API REST simples em Node.js com MySQL e Typescript em pouco tempo.
