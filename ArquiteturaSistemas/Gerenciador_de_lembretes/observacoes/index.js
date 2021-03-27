const express = require ('express');
const {v4: uuidv4} = require ('uuid');
const axios = require ('axios');

const app = express();
app.use(express.json());
const observacoesPorLembreteID = {};

const funcoes = {
    ObservacaoClassificada: (observacao) => {
        const observacoes = observacoesPorLembreteID[observacao.lembreteId];
        // Itera e devolve o objeto "o", se o id do objeto o for igual ao da observacao
        // Não está mexendo numa cópia do banco de dados, mas no banco de dados em si
        const obsParaAtualizar = observacoes.find((o) => o.id === observacao.id);
        obsParaAtualizar.status = observacao.status;
        axios.post('http://localhost:10000/eventos', {
            tipo: "ObservacaoAtualizada",
            dados: {
                id: observacao.id, 
                texto: observacao.texto,
                lembreteId: observacao.lembreteId,
                status: observacao.status
            }
        })
    }
}




app.put('/lembretes/:id/observacoes', async (req, res) => {

    // Gerando um id com o uuid v4; vai enviar o id de lembrete e depois a observação
    const idObs = uuidv4();
    // Extraindo o texto
    const { texto } = req.body;
    const observacoesDoLembreteAtual = observacoesPorLembreteID[req.params.id] || [];
    observacoesDoLembreteAtual.push({id: idObs, texto, status: 'aguardando'});
    // Se não existia, é preenchida; se existia, é atualizada
    observacoesPorLembreteID[req.params.id] = observacoesDoLembreteAtual;

    await axios.post('http://localhost:10000/eventos', {
        tipo: "ObservacaoCriada",
        dados: {
            id: idObs, texto, lembreteId: req.params.id, status: 'aguardando'
        }
    });

    res.status(201).send(observacoesDoLembreteAtual);
});


app.get('/lembretes/:id/observacoes', (req, res) => {

    res.send(observacoesPorLembreteID[req.params.id] || []);

});

app.post ('/eventos', (req, res) => {
    // Descartando os eventos que não são de interesse
    try{
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}

    res.status(200).send({msg: 'ok'});

  });


app.listen(5000, () => console.log("Microserviço observações, Porta 5000"));