// Importa o express com o require (o express é aquele que trata as requisições HTTP)
const express = require ('express');

// Um gerador de middleware 
const bodyParser = require("body-parser");

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
app.put('/lembretes', (req, res) => {

     //{texto: "Fazer café"}

    // Colocando uma atribuição ({}) em texto, não vai valer o objeto inteiro, a
    // estrutura do json vai ser inspecionada e só vai pegar o valor da chave 
    // texto (que vai guardar na variável texto)
    const {texto} = req.body;
    contador++;

    /* Então o lembretes vai ficar um json com a seguinte estrutura:
        {
            1: {
                contador: 1, texto: "Fazer café",
            }
            2: {
                contador: 2, texto: "Ver um filme",
            }
        }
    */
    lembretes[contador] = {
        contador, texto
    }

    res.status(201).send(lembretes[contador]);


})

// Inicia o servidor, ele está "escutando", esperando requisições chegarem;
// porta 4000 escolhida arbitrariamente
app.listen(4000, () => {
    
    //print
    console.log("Microsserviço de lembretes executando na porta 4000")
});