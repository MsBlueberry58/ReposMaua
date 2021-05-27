const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');
require('dotenv').config({path: 'C:/Users/leafe/Documents/ReposMaua/ArquiteturaSistemas/Projeto_Vacina/.env'});

const eventos = [];



app.post('/eventos', (req, res) => {

    const evento = req.body;
    eventos.push(evento);

    // Envia o evento para o mss de alerta de vacinas
    axios.post(`http://localhost:${process.env.PORT_ALERTA}/eventos`, evento);
    // Envia o evento para o mss de cadastro
    axios.post(`http://localhost:${process.env.PORT_CADASTRO}/eventos`, evento);
    // Envia o evento para o mss de customizacao de vacinas
    axios.post(`http://localhost:${process.env.PORT_CUSTOM}/eventos`, evento);  
    // Envia o evento para o mss de estoque
    axios.post(`http://localhost:${process.env.PORT_ESTOQUE}/eventos`, evento);

    res.status(200).send({msg: 'Deu tudo certo'});
});


app.get('/eventos', (req, res) => {
    res.send(eventos);
  })


  

app.listen(process.env.PORT_BARRAMENTO, () => console.log(`Microsservico de Barramento de Eventos. Porta ${process.env.PORT_BARRAMENTO}.`));