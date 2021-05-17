const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');



app.listen(process.env.PORT_CUSTOM, () => console.log(`Microsservico de Customizacao de Notificacoes. Porta ${process.env.PORT_CUSTOM}.`));