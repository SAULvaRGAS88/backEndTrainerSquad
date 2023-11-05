const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const rotaPersonal = require('./rota/personal_rota');
const rotaAluno = require('./rota/aluno_rota');
const rotaPagamento = require('./rota/pagamento_rota');
const rotaTreino = require('./rota/treino_rota');
const rotaAvaliacao = require('./rota/avaliacao_rota');

app.use(cors({ origin: '*' })); // Configura o CORS para permitir qualquer origem

app.use(express.json()); // Configuração para receber dados JSON
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log('Recebida solicitação GET para /usuarios');
    res.json({
        message: "Funcionando, PUM!!!!!!!!!!!!!!!!!!!!!!!"
    });
});

app.use("/api/personal", rotaPersonal);
app.use("/api/treino", rotaTreino);
app.use("/api/avaliacao", rotaAvaliacao);

app.use("/api/aluno", rotaAluno);
app.use("/api/pagamento", rotaPagamento);

app.listen(port, () => {
    console.log(`Trainer Squad rodando na porta ${port}`);
});
