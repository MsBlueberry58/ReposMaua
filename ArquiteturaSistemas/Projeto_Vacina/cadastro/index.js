const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');



app.listen(process.env.PORT_CADASTRO, () => console.log(`Microsservico de Cadastro. Porta ${process.env.PORT_CADASTRO}.`));