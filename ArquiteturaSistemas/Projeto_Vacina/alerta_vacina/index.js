const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');
require('dotenv').config({path: 'C:/Users/leafe/Documents/ReposMaua/ArquiteturaSistemas/Projeto_Vacina/.env'});

const baseIdades = [];
const baseAlertas = {};

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
        return "A vacina está disponível para você!"
      }
      else{
        return "Sua vacina ainda não está disponível."
      }
    }
  };

// Printa as idades dos usuários cadastrados
app.get('/idades', (req, res) => {

  res.send(baseIdades);

  })

// Requisição que vai informar aos alertas a faixa etária que vai ser vacinado 
app.put('/alertar',  (req, res) => {

  faixa = req.body.idade;
  console.log(faixa);

  res.status(201).send({msg: "Faixa etária alterada com sucesso!"})

})

// Requisição que vai informar o status dos alertas dos usuários
app.get('/alertas', (req, res) => {

  baseAlertas[id] = {
    id, status: req.body
  }

  baseIdades.forEach(idade_user => {
    console.log("IDADE DO FOR EACH: " + idade_user);
    baseAlertas[id] = funcoes.GerarAlerta(idade_user, faixa);
    id++;
  })

  res.send(baseAlertas);

})

app.post('/eventos', (req, res) => {

  niver = req.body.usuarios.usuario.aniversario;

  idade = funcoes.CalcularIdade(niver);
  baseIdades[contador] = idade;
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