const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');
const filePath = path.resolve(__dirname, 'data.xml');
const cors = require('cors')

const app = express();
app.use(cors())
const port = 3000;

// middleware
app.use(express.text({ type: 'application/xml' }));

app.get('/api/users', (req, res) => {
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  xml2js.parseString(xmlData, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao processar XML.');
    }
    res.json(result);
  });
});

app.post('/api/users', (req, res) => {
  const newUserXML = req.body;
  const xmlData = fs.readFileSync(filePath, 'utf-8');

  xml2js.parseString(xmlData, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao processar XML.');
    }

    const users = result.users;
    const newUser = xml2js.parseString(newUserXML, { explicitArray: false }).user;
    users.push(newUser);

    const builder = new xml2js.Builder();
    const newXmlData = builder.buildObject(result);

    fs.writeFileSync(filePath, newXmlData, 'utf-8');
    res.status(201).send('Usuário adicionado com sucesso.');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
