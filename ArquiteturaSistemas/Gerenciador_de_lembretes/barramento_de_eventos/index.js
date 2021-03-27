// Imports
const express = require ('express');
// Agora usamos o axios, por conta do barramento de eventos (já que é 
//preciso realizar a emissão de eventos): vai receber requisições
// e, por enquanto, só faz um broadcast (por meio de envios POST)
const axios = require('axios');

const app = express();
app.use(express.json());

const eventos = [];


// Alguém faz um post no barramento de eventos, e o barramento de eventos
// devolve/espelha, isso que quer dizer com eco
app.post('/eventos', (req, res) => {

    const evento = req.body;
    eventos.push(evento);
    // Envia o evento para o microsserviço de lembretes
    axios.post('http://localhost:4000/eventos', evento);
    // Envia o evento para o microsserviço de observações
    axios.post('http://localhost:5000/eventos', evento);
    // Envia o evento para o microsserviço de consulta
    axios.post('http://localhost:6000/eventos', evento);
    // Envia o evento para o microsserviço de classificação
    axios.post('http://localhost:7000/eventos', evento);
    
    res.status(200).send({msg: 'Deu tudo certo'});

});

app.get('/eventos', (req, res) => {
    res.send(eventos);
  })
  

app.listen(10000, () => console.log("Event Bus, Porta 10000"));