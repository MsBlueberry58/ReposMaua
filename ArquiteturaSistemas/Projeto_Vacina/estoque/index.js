const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');



app.listen(process.env.PORT_ESTOQUE, () => console.log(`Microsservico de Estoque. Porta ${process.env.PORT_ESTOQUE}.`));