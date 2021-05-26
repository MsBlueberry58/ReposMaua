require('dotenv').config({path: 'C:/Users/leafe/Documents/ReposMaua/ArquiteturaSistemas/Projeto_Vacina/.env'});
const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');

// Zerando o contador (cada cadastro vai ter um id)
var contador = 0;

// Banco de dados (volátil por enquanto)
const usuarios = [];

// Apresentando os dados pro cliente
app.get('/usuarios', (req, res) => {
    res.send(usuarios);
});

app.put('/cadastrar', async (req, res) => {

    let rg_existe = false;

    // Tratamento necessário para evitar usuários duplicados no banco de dados
    usuarios.forEach(usuario => {
        if(usuario.usuario.RG === req.body.RG){
            rg_existe = true;
            return res.status(403).send({msg: "O usuário já existe no banco de dados."});
        }
    });

    if(!rg_existe){

        usuarios[contador] = {
            contador, usuario: req.body
        }
        contador++;

    }

    // Enviando para o barramento de eventos
    await axios.post(`http://localhost:${process.env.PORT_BARRAMENTO}/eventos`, {
        tipo: "UsuarioCadastrado",
        usuarios: { contador, usuario: req.body }
    });

    res.status(201).send({msg: "Usuário criado com sucesso!"});

});

// Por enquanto, não faz nada com o evento, só recebe e printa
app.post('/eventos', (req, res) => {
    console.log(req.body);
    res.status(200).send({msg: 'Evento ok'});
  });


app.listen(process.env.PORT_CADASTRO, () => console.log(`Microsservico de Cadastro. Porta ${process.env.PORT_CADASTRO}.`));