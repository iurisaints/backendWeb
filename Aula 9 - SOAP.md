# Como criar uma API SOAP:

### Passo 1: Instalar Dependências

Certifique-se de ter o `strong-soap` instalado. Se ainda não tiver, execute o seguinte comando no terminal:

```bash
npm install strong-soap
```

### Passo 2: Configurar e Executar o Servidor SOAP

1. **Arquivo `path/to/YourService.wsdl`:**
   - Certifique-se de ter um arquivo WSDL válido definindo o serviço que você está expondo. Se não tiver um, você precisará criar um para o seu serviço.

2. **Modificar o Arquivo `soapapi.js`:**
   - Edite o arquivo `soapapi.js` e substitua `'path/to/YourService.wsdl'` pelo caminho real para o seu arquivo WSDL.

   ```javascript
   // ...

   // Configure o servidor SOAP
   const xml = require('fs').readFileSync('path/to/YourService.wsdl', 'utf8');
   const server = soap.listen(8001, '/YourService', service, xml);

   // ...
   ```

3. **Iniciar o Servidor:**
   - Execute o arquivo `soapapi.js` para iniciar o servidor SOAP.

   ```bash
   node soapapi.js
   ```

   Isso iniciará o servidor SOAP na porta 8001.

### Passo 3: Realizar uma Solicitação SOAP

Você pode usar a ferramenta SoapUI ou um script como o seguinte para realizar uma solicitação SOAP:

```javascript
const soap = require('strong-soap').soap;

const requestArgs = {
  UserID: 123
};

const requestHeaders = {
  'Content-Type': 'text/xml;charset=UTF-8',
  'SOAPAction': 'MyService.MyPort.GetUser'
};

const options = {
  hostname: 'localhost',
  port: 8001,
  path: '/YourService',
  method: 'POST',
  headers: requestHeaders
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
  });
});

req.write(soap.createRequest('MyService.MyPort.GetUser', requestArgs, 'http://localhost:8001/YourService'));
req.end();
```

**Observação:** Certifique-se de ajustar o código conforme necessário, substituindo os valores de `UserID` e outros conforme o seu serviço.

Ao executar este script ou usar uma ferramenta como SoapUI para fazer uma solicitação, você deve receber a resposta do servidor SOAP com os dados do usuário. Certifique-se de substituir os valores e ajustar conforme necessário com base no seu serviço SOAP específico.

## Exemplos:

1. Estrutura da Mensagem SOAP:
   ```
   <soapenv:Envelope xmlns:soapenv="<http://schemas.xmlsoap.org/soap/envelope/>"
                  xmlns:web="<http://www.example.com/webservice>">
   <soapenv:Header/>
   <soapenv:Body>
      <!-- Dados da mensagem -->
   </soapenv:Body>
   </soapenv:Envelope>
   ```
2. Exemplo de Chamada de Método Remoto:
   ```
   <soapenv:Envelope xmlns:soapenv="<http://schemas.xmlsoap.org/soap/envelope/>"
                  xmlns:web="<http://www.example.com/webservice>">
   <soapenv:Header/>
   <soapenv:Body>
      <web:GetUserInfo>
         <web:UserID>123</web:UserID>
      </web:GetUserInfo>
   </soapenv:Body>
   </soapenv:Envelope>
   ```
3. Exemplo de Resposta:
   ```
   <soapenv:Envelope xmlns:soapenv="<http://schemas.xmlsoap.org/soap/envelope/>"
                  xmlns:web="<http://www.example.com/webservice>">
   <soapenv:Header/>
   <soapenv:Body>
      <web:GetUserInfoResponse>
         <web:UserName>John Doe</web:UserName>
         <web:UserEmail>john@example.com</web:UserEmail>
      </web:GetUserInfoResponse>
   </soapenv:Body>
   </soapenv:Envelope>
   ```

