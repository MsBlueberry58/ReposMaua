const express = require ('express');
const app = express();

// Quando for feita uma requisição get com esse padrão de acesso, vai ser executada essa função
app.get('/lembretes', (req, res) => {

    // Só demonstrando, pois isso já é padrão do HTTP
    res.status(200).send({"Resultado" : "OK"})

});

// Inicia o servidor, ele está "escutando", esperando requisições chegarem; porta 4000 escolhida arbitrariamente
app.listen(4000, () => {
    
    //print
    console.log("Microsserviço de lembretes executando na porta 4000")
});