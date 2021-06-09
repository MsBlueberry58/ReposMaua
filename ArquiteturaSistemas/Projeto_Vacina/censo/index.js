require('dotenv').config({path: 'C:/Users/leafe/Documents/ReposMaua/ArquiteturaSistemas/Projeto_Vacina/.env'});
const express = require('express');
var moment = require('moment');
const app = express();
app.use(express.json());
const axios = require('axios');

baseAniversarios = [];
idCenso = 0;

app.get('/censo', (req, res) => {

})




app.post('/eventos', (req, res) => {

    if(req.body.tipo === "UsuarioCadastrado"){

        
        data_nascimento = req.body.usuarios.usuario.aniversario;
        data_nascimento = new moment(data_nascimento, "DD/MM/YYYY");
        hoje = new moment();

        idadeCenso = hoje.diff(data_nascimento, "year");
             

    }

  
  })


app.listen(process.env.PORT_CENSO, async () => {
    
    const resp = await axios.get(`http://localhost:${process.env.PORT_BARRAMENTO}/eventos`)
    
    resp.data.forEach((valor, indice, colecao) => {
        try{
            funcoes[valor.tipo](usuarios.usuario)
          } catch (err){}

    })
    console.log(`Microsservico de Censo. Porta ${process.env.PORT_CENSO}.`)

});