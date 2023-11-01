const express = require('express')
const cors = require('cors');
require("dotenv").config()

const app = express()
const port = process.env.PORT;

const rotaPersonal = require('./rota/personal_rota')
const rotaTreino = require('./rota/treino_rota')
const rotaAvaliacao = require('./rota/avaliacao_rota')
const rotaAluno = require('./rota/aluno_rota')
const rotaPagamento = require('./rota/pagamento_rota')


app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
app.use(express.json()) //configuração pra receber dados json

app.get("/", (req, res) => {
    console.log('Recebida solicitação GET para /usuarios');
    res.json({
        message: "Funcionanso, PUM!!!!!!!!!!!!!!!!!!!!!!!"
    })
})
// app.get("/dashboard", (req, res) => {
//     console.log('Recebida solicitação GET para /dashboard');
//     res.json({
//         message: "dashboard"
//     })
//   });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/personal", rotaPersonal);
app.use("/api/treino", rotaTreino);
app.use("/api/avaliacao", rotaAvaliacao);

app.use("/api/aluno", rotaAluno);
app.use("/api/pagamento", rotaPagamento);

app.listen(port, () => {
    console.log(`Trainer Squad rodando na porta ${port}`)
})