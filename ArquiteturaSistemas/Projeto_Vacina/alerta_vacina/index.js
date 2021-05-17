const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');



app.listen(process.env.PORT_ALERTA, () => console.log(`Microsservico de Alerta de Vacinas. Porta ${process.env.PORT_ALERTA}.`));