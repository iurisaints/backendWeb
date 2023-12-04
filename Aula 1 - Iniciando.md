## Construção de APIs Poderosas com NodeJS, TypeScript e MySQL

O MySQL destaca-se como uma escolha principal para bancos de dados relacionais na pilha tecnológica de todos os desenvolvedores NodeJS. A capacidade do Node em criar APIs de backend, combinada com a robustez do MySQL para suportar operações de consulta complexas, oferece uma abordagem descomplicada para o desenvolvimento de backends web avançados.

Neste tutorial, embarcaremos na criação de uma API REST para uma loja online usando o framework Express, com o MySQL como nosso banco de dados escolhido. Optamos por construir esta API em TypeScript, em vez de utilizar o JavaScript tradicional para a implementação.

O suporte a tipos de script no TypeScript reduz a margem para o uso inadequado de tipos, permitindo-nos escrever um código mais limpo e reutilizável. Se você está iniciando no TypeScript ou deseja relembrar conceitos da linguagem, sugerimos a leitura do nosso guia TypeScript para desenvolvedores JavaScript antes de avançar para a próxima etapa.

Com a introdução resolvida, vamos começar agora.

### Antes de Iniciar...

Antes de mergulhar no tutorial, certifique-se de que todas as ferramentas necessárias estão configuradas. Presumimos que o Node.js já está instalado; caso contrário, instale-o antes de prosseguir. Certifique-se também de ter o MySQL instalado no seu dispositivo antes de continuar.

### Configurando o Banco de Dados

Como mencionado anteriormente, estamos criando uma API para uma loja online simples, armazenando uma lista de produtos e clientes registrados no banco de dados. Quando os clientes fazem pedidos de produtos, os detalhes são armazenados no banco de dados.

O esquema do banco de dados consiste em três tabelas: Product, Customer e ProductOrder.

```sql
-- Criação do banco de dados
CREATE DATABASE OnlineStore;

-- Seleção do banco de dados recém-criado
USE OnlineStore;

-- Criação das tabelas
CREATE TABLE Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(255),
    instock_quantity INT,
    price DECIMAL(8, 2)
);

CREATE TABLE Customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

CREATE TABLE ProductOrder (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    customer_id INT,
    product_quantity INT,
    FOREIGN KEY (product_id) REFERENCES Product(id),
    FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

-- Exemplo de inserção de dados nas tabelas criadas
INSERT INTO Product VALUES (1, "Apple MacBook Pro", "15 inch, i7, 16GB RAM", 5, 667.00);
INSERT INTO Customer VALUES (1, "Anjalee", "2w33he94yg4mx88j9j2hy4uhd32w", "anjalee@gmail.com");
INSERT INTO ProductOrder VALUES (1, 1, 1, 1);
```

Excelente! Agora o esquema do banco de dados está completo. Podemos prosseguir para o Node.js e começar a implementação da API na próxima etapa.
