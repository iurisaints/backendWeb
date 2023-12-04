
### Definir Novos Tipos para a API

Devemos definir novos tipos para os objetos Produto, Cliente e Pedido, armazenados no diretório de tipos.

#### Tipos de Produto (`types/product.ts`)

```typescript
export interface BasicProduct {
  id: number;
}

export interface Product extends BasicProduct {
  name: string;
  description: string;
  instockQuantity: number;
  price: number;
}
```

Neste caso, criamos dois tipos de produtos. O primeiro, `BasicProduct`, contém apenas o ID do produto. O segundo, `Product`, estende a primeira interface, criando um tipo com detalhes elaborados.

#### Tipos de Cliente (`types/customer.ts`)

```typescript
export interface BasicCustomer {
  id: number;
}

export interface Customer extends BasicCustomer {
  name: string;
  email?: string;
  password?: string;
}
```

Ao definir os tipos de cliente, utilizamos uma abordagem semelhante, com um tipo básico e outro mais detalhado.

#### Tipos de Pedido (`types/order.ts`)

```typescript
import { BasicProduct, Product } from "./product";
import { BasicCustomer, Customer } from "./customer";

export interface BasicOrder {
  product: BasicProduct;
  customer: BasicCustomer;
  productQuantity: number;
}

export interface Order extends BasicOrder {
  orderId: number;
}

export interface OrderWithDetails extends Order {
  product: Product;
  customer: Customer;
}
```

Os tipos de pedido utilizam os tipos de cliente e produto previamente definidos. O `BasicOrder`, sem o id, é útil ao criar um novo pedido que ainda não possui um ID.

Este diretório de tipos fornece uma estrutura organizada para as definições de tipo do nosso projeto.
