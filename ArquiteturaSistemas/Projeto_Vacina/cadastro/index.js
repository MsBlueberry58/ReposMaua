const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');
require('dotenv').config({path: 'C:/Users/leafe/Documents/ReposMaua/ArquiteturaSistemas/Projeto_Vacina/.env'});


// Zerando o contador (cada cadastro vai ter um id)
contador = 0;

// Banco de dados (volátil por enquanto)
const dados = {};

app.put('/cadastrar', (req, res) => {

    // Definindo o json dos dados de cadastro
    const {texto} = req.body;
    contador++;

    dados[contador] = {
        contador, texto
    }


})


app.listen(process.env.PORT_CADASTRO, () => console.log(`Microsservico de Cadastro. Porta ${process.env.PORT_CADASTRO}.`));