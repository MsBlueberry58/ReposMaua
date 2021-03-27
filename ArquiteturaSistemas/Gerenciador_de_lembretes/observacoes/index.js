const express = require ('express');

const bodyParser = require('body-parser');

// Import nomeado, está atribuindo um apelido ao atributo, um nome 
// para esse contexto
const {v4: uuidv4} = require ('uuid');
const axios = require ('axios');


const app = express();
app.use(bodyParser.json());


const observacoesPorLembreteID = {};

app.put('/lembretes/:id/observacoes', async (req, res) => {

    // Gerando um id com o uuid v4; vai enviar o id de lembrete e depois a observação
    const idObs = uuidv4();

    // Extraindo o texto
    const { texto } = req.body;

    // Está acessando o que existe na url, essa chave está associada ao valor passado 
    // para o :id; olhando para a base tentando pegar um objeto associado a esse id, sendo
    // que pode existir ou não (vazio ou não)
    const observacoesDoLembreteAtual = observacoesPorLembreteID[req.params.id] || [];

    // Uma chave denominada texto associada à uma variável chamada texto pode ser
    // reduzida apenas à palavra "texto"
    observacoesDoLembreteAtual.push({id: idObs, texto});

    // Se não existia, é preenchida; se existia, é atualizada
    observacoesPorLembreteID[req.params.id] = observacoesDoLembreteAtual;

    await axios.post('http://localhost:6000/eventos', {
        tipo: "ObservacaoCriada",
        dados: {
            id: idObs, texto, lembreteId: req.params.id
        }
    });

    // CREATED
    res.status(201).send(observacoesDoLembreteAtual);
});

// Vamos devolver só a coleção mesmo; ou devolve a coleção que já existe (relacionada com o id),
// ou uma coleção vaiza
app.get('/lembretes/:id/observacoes', (req, res) => {

    // Pegando as observações do lembrete cujo id está na URL
    res.send(observacoesPorLembreteID[req.params.id] || []);

});

// Por enquanto, observações não faz nada com o evento, só recebe e printa
app.post ('/eventos', (req, res) => {
    console.log(req.body);
    res.status(200).send({msg: 'ok'});
  });


app.listen(5000, () => console.log("Microserviço observações, Porta 5000"));