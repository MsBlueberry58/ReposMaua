// Importa o express com o require (o express é aquele que trata as requisições HTTP)
const express = require ('express');

// Um gerador de middleware 
const bodyParser = require("body-parser");

// Assim que um novo lembrete for recebido, avisa o barramento de eventos
const axios = require('axios');

// Construção de um objeto chamando o express
const app = express();
app.use(bodyParser.json());

// Cada lembrete vai ter um id
contador = 0;

// Base de dados volátil, um simples documento JSON
const lembretes = {};

// Quando for feita uma requisição get com esse padrão de acesso, nesse endpoint,
// vai ser executada essa função
app.get('/lembretes', (req, res) => {

    // Devolve os lembretes/coisas para o cliente
    res.send(lembretes);

});

// Envia os lembretes para o cliente
app.put('/lembretes', async (req, res) => {

    const {texto} = req.body;
    contador++;

    lembretes[contador] = {
        contador, texto
    }

    // Para enviar uma requisição/disparar uma requisição HTTP
    await axios.post('http://localhost:10000/eventos', {
        tipo: "LembreteCriado",
        dados: { contador, texto }
    });

    res.status(201).send(lembretes[contador]);


});

// Por enquanto, lembretes não faz nada com o evento, só recebe e printa
app.post('/eventos', (req, res) => {
    console.log(req.body);
    res.status(200).send({msg: 'ok'});
  });

// Inicia o servidor, ele está "escutando", esperando requisições chegarem;
// porta 4000 escolhida arbitrariamente
app.listen(4000, () => {
    
    //print
    console.log("Microsserviço de lembretes executando na porta 4000")
});