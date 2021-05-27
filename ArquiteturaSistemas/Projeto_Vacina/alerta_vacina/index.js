const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');
require('dotenv').config({path: 'C:/Users/leafe/Documents/ReposMaua/ArquiteturaSistemas/Projeto_Vacina/.env'});

const baseIdades = {};
const idadePorUsuarioID = {};

const funcoes = {
    UsuarioCadastrado: (usuario) => {
      baseIdades[usuario.usuario.RG] = usuario.aniversario;
    }
  };


  app.get('/idades', async (req, res) => {
      res.send(baseIdades)
  })

  app.put('/usuarios/:contador/idade', async (req, res) => {

    // Extraindo o texto
    const { texto } = req.body;
    const idadeDoUsuarioAtual = idadePorUsuarioID[req.params.aniversario] || [];
    idadeDoUsuarioAtual.push({texto, status: 'Falta calcular a idade'});
    // Se não existia, é preenchida; se existia, é atualizada
    idadePorUsuarioID[req.params.aniversario] = idadeDoUsuarioAtual;

    await axios.post(`http://localhost:${process.env.PORT_BARRAMENTO}/eventos`, {
        tipo: "PegarIdade",
        dados: {
           texto, aniversario: req.body.aniversario, status: 'Falta calcular a idade'
        }
    });

    res.status(201).send(idadeDoUsuarioAtual);
});


app.listen(process.env.PORT_ALERTA, async () => {
    
    const resp = await axios.get(`http://localhost:${process.env.PORT_BARRAMENTO}/eventos`)
    
    resp.data.forEach((valor, indice, colecao) => {
        try{
            funcoes[valor.tipo](usuarios.usuario)
          } catch (err){}

    })
    console.log(`Microsservico de Alerta de Vacinas. Porta ${process.env.PORT_ALERTA}.`)

});