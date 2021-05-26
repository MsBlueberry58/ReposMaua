const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');
require('dotenv').config({path: 'C:/Users/leafe/Documents/ReposMaua/ArquiteturaSistemas/Projeto_Vacina/.env'});



app.listen(process.env.PORT_ALERTA, () => console.log(`Microsservico de Alerta de Vacinas. Porta ${process.env.PORT_ALERTA}.`));