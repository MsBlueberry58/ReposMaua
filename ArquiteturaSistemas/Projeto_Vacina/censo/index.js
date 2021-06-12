require('dotenv').config({path: 'C:/Users/leafe/Documents/ReposMaua/ArquiteturaSistemas/Projeto_Vacina/.env'});
const express = require('express');
var moment = require('moment');
const app = express();
app.use(express.json());
const axios = require('axios');

baseCenso = [];
idCenso = 0;
baseIdades = [];

const funcoes = {
    groupBy: (list, keyGetter) => {
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
    }
}

app.get('/censo', (req, res) => {

  
    

    baseCenso[idCenso] = {
        Faixa_etaria: 0,
        Quantidade_de_pessoas: 0,
        };

    //baseIdades.forEach(funcoes.PercorrerCenso())

    const grouped = groupBy(baseCenso, idade => Faixa_etaria);
    res.send(grouped.get(21));




})


app.post('/eventos', (req, res) => {

    if(req.body.tipo === "UsuarioCadastrado"){
       
    idadeCenso = req.body.usuario.idade;

    console.log("Idade cadastrada: " + idadeCenso);

    baseIdades.push(idadeCenso);     
    
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