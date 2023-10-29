const express = require('express')
const rotaPersonal = require('./rota/personal_rota')
const rotaTreino = require('./rota/treino_rota')
const rotaAvaliacao = require('./rota/avaliacao_rota')
const cors = require('cors');
require("dotenv").config()

const rotaAluno = require('./rota/aluno_rota')
const rotaPagamento = require('./rota/pagamento_rota')

const app = express()
const port = process.env.PORT || 5000;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const db = require("./db")

app.use(express.json()) //configuração pra receber dados json

app.get("/", ( req, res)=>{
    res.json({
        message: "Funcionanso, PUM!!!!!!!!!!!!!!!!!!!!!!!"
    })
})

// Busca por id
app.get("/usuario/:id", async (req, res)=>{
    const usuario = await db.selecionarUsuario(req.params.id)
    res.json(usuario)
})

// Busca geral
app.get("/usuarios", async (req, res)=>{
    const usuarios = await db.selecionarUsuarios()
    res.json(usuarios)
})

// Inserir POST
app.post("/usuarios", async (req, res)=>{
    await db.inserirUsuario(req.body)
    res.sendStatus(201)
})

// Atualizar PATCH
app.patch("/usuario/:id", async (req, res)=>{
    await db.atualizarUsuario(req.params.id ,req.body)
    res.sendStatus(200)
})

// Deletar DELETE
app.delete("/usuario/:id", async (req, res)=>{
    await db.deletarUsuario(req.params.id)
    res.sendStatus(204)
})

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');

    next();
});

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));  

app.use("/api/personal", rotaPersonal);
app.use("/api/treino", rotaTreino);
app.use("/api/avaliacao", rotaAvaliacao);

//
app.use("/api/aluno", rotaAluno);
app.use("/api/pagamento", rotaPagamento);

app.listen(port, () => {
    console.log(`Trainer Squad rodando na porta ${port}`)
})