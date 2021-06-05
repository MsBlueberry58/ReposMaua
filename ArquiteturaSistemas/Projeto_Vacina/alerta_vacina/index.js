const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');
require('dotenv').config({path: 'C:/Users/leafe/Documents/ReposMaua/ArquiteturaSistemas/Projeto_Vacina/.env'});

const baseIdades = {};
const baseAlertas = {};
const baseRG = {};

vacDisp = false;
contador = 0;
id = 0;

const funcoes = {
    CalcularIdade: (aniversario) => {

      var data = new Date();
      var idade = 0;
      var niver_formatado = aniversario.split('/');

      var dia = Number(niver_formatado[0]);
      var mes = Number(niver_formatado[1]);
      var ano = Number(niver_formatado[2]);

      var dif_ano = data.getFullYear() - ano;
      var dif_mes = data.getMonth() - mes;
      var dif_dia = data.getDay() - dia;
      
     if (dif_mes < 0){
         idade = dif_ano - 1;
     }
     else if (dif_mes === 0){
        if (dif_dia < 0){
          idade = dif_ano - 1;
      } else{
        idade = dif_ano;
      }
     }
     else if (dif_mes > 0){
       idade = dif_ano;
     };

     return idade;

    },
    GerarAlerta: (idade_user, idade_vacina) => {
      if (idade_user === idade_vacina){
        return true;
      }
      else{
        return false;
      }
    }
  };

// Printa as idades dos usuários cadastrados
app.get('/idades', (req, res) => {

  res.send(baseIdades);

  })

// Requisição que vai informar aos alertas a faixa etária que vai ser vacinada
app.put('/alertar',  (req, res) => {

  faixa = req.body.idade;

  for (id = 0; id < Object.keys(baseIdades).length; id++) {

    baseIdades[id].verificado = "Idade ainda não verificada.";
    baseAlertas[id].status = "A definir";

  }

  res.status(201).send({msg: "Faixa etária alterada com sucesso!"})

})

// Requisição que vai informar o status dos alertas dos usuários
app.get('/alertas', (req, res) => {

for (id = 0; id < Object.keys(baseIdades).length; id++) {

  if(baseIdades[id].verificado === "Idade ainda não verificada."){ 

    status = "A definir";
    RG = baseIdades[id].rg;

    baseAlertas[id] = {
      id, RG, status
    }

    msg = funcoes.GerarAlerta(baseIdades[id].idade, faixa);

      if(msg){
        baseAlertas[id].status = "Sua vacina está disponível!"
      }
      else{
        baseAlertas[id].status = "Infelizmente, sua vacina ainda não está disponível."
      }

  baseIdades[id].verificado = "Idade do usuário já verificada.";

  }
 }

res.send(baseAlertas);

})

app.post('/eventos', (req, res) => {

  verificado = "Idade ainda não verificada.";
  niver = req.body.usuarios.usuario.aniversario;
  rg = req.body.usuarios.usuario.RG;

  idade = funcoes.CalcularIdade(niver);

  baseIdades[contador] = {
    rg, idade, verificado
  };

  contador++;

})

app.listen(process.env.PORT_ALERTA, async () => {
    
    const resp = await axios.get(`http://localhost:${process.env.PORT_BARRAMENTO}/eventos`)
    
    resp.data.forEach((valor, indice, colecao) => {
        try{
            funcoes[valor.tipo](usuarios.usuario)
          } catch (err){}

    })
    console.log(`Microsservico de Alerta de Vacinas. Porta ${process.env.PORT_ALERTA}.`)

});