Combinação imbatível para desenvolvimento de APIs: NodeJS, TypeScript e MySQL

O MySQL se destaca indubitavelmente como uma das escolhas primárias para um banco de dados relacional na stack tecnológica de todos os programadores Node. A habilidade do Node em criar APIs de back-end, combinada com a capacidade do MySQL de lidar com operações de consulta complexas, oferece uma abordagem descomplicada para a construção de back-ends web avançados.

Neste guia, iremos criar uma API REST básica para uma loja online usando a estrutura Express. O MySQL foi selecionado como nosso banco de dados. Em vez de optar por JavaScript convencional na implementação, escolhemos construir esta API usando TypeScript.

O suporte a tipos no TypeScript reduz significativamente a margem para utilização incorreta dos tipos. Isso contribui para a redação de um código mais claro e reutilizável. Se você é um iniciante em TypeScript ou deseja relembrar os conceitos da linguagem, consulte nosso guia para desenvolvedores de JavaScript antes de prosseguir.

Com a introdução inicial abordada, agora podemos dar início. Antes de começarmos...

Antes de iniciar o tutorial, assegure-se de ter todas as ferramentas necessárias configuradas. Considerando que o Node.js já está instalado, proceda com a instalação do MySQL em seu dispositivo antes de prosseguir.
Configurar o banco de dados

Como mencionado anteriormente, estamos desenvolvendo uma API para uma loja online simples, que mantém uma lista de produtos e clientes registrados em seu banco de dados. Os detalhes dos clientes e seus pedidos também são armazenados neste banco de dados quando eles fazem compras.

No total, o esquema do nosso banco de dados é composto por 3 tabelas: Product, Customer e ProductOrder.
Seu guia para criar uma API Restful com NodeJS, TypeScript e MySQL
Seu guia para criar uma API Restful com NodeJS, TypeScript e MySQL

Vou criá-las utilizando consultas SQL convencionais. Caso prefira, você pode utilizar uma ferramenta gráfica para criar o esquema do banco de dados.

Certifique-se de que o servidor MySQL esteja em execução e execute o seguinte comando na linha de comando (Você pode precisar adicionar o MySQL às variáveis de ambiente para usar o comando mysql diretamente).
```
mysql -u <username> -p <password>
```
Isso abrirá o shell do MySQL, onde é possível executar consultas SQL diretamente no banco de dados.

Agora, podemos criar um novo banco de dados para o nosso projeto.
```
create database OnlineStore
```
Utilize o comando a seguir para mudar para o banco de dados recém-criado.
```
use OnlineStore;
```
Em seguida, execute as consultas abaixo para criar as tabelas necessárias.
```
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
```
Utilize consultas similares às abaixo para inserir alguns dados nas tabelas criadas.
```
INSERT INTO Product VALUES (1, "Apple MacBook Pro", "15 polegadas, i7, 16GB RAM", 5, 667.00);
```
```
INSERT INTO Customer VALUES (1, "Anjalee", "2w33he94yg4mx88j9j2hy4uhd32w", "anjalee@gmail.com");
```
```
INSERT INTO ProductOrder VALUES (1, 1, 1, 1);
```
Excelente! Agora o esquema do banco de dados está concluído. Vamos avançar para o Node.js e começar a implementação da API na próxima etapa.
