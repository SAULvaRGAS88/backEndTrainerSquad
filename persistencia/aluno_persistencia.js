// const { Client } = require('pg')
// const { conexao } = require('./conexao')
// const { query } = require('express')
const connect = require("../db");


// Create
async function addAluno(idUsuario, aluno) {
    const client = await connect()
    let resAluno
    try {
        await client.query('BEGIN')

        const sql = `INSERT INTO aluno(sexo, nome, cpf, dt_nascimento, telefone, email, status, plano, idUsuario)
                                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`
        const values = [aluno.sexo, aluno.nome, aluno.cpf, aluno.dt_nascimento, aluno.telefone, aluno.email, "Ativo",
        aluno.plano, idUsuario]
        resAluno = await client.query(sql, values)

        const sqlPag = `INSERT INTO pagamento(id_aluno, dt_pagamento, status, valor) VALUES($1, $2, $3, $4) RETURNING *`
        const valuesPag = [resAluno.rows[0].id, aluno.pagamento.dt_pagamento, "Pendente", aluno.pagamento.valor]
        const pag = await client.query(sqlPag, valuesPag)

        await client.query('COMMIT')

        return { aluno: resAluno.rows[0], pagamento: pag.rows[0] };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.end()
    }
}

// Read
async function buscarAluno() {
    const client = await connect()

    try {
        const sql = `SELECT * FROM aluno`
        const aluno = await client.query(sql)

        client.end()
        return aluno.rows
    } catch (error) { throw error }
}

async function buscarAlunoPorNome(nome) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM aluno WHERE nome = $1`
        const values = [nome]
        const nomeAluno = await client.query(sql, values)

        client.end()
        return nomeAluno.rows[0]
    } catch (error) { throw error }
}

async function buscarAlunoPorEmail(email) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM aluno WHERE email = $1`
        const values = [email]
        const emailAluno = await client.query(sql, values)

        client.end()
        return emailAluno.rows[0]
    } catch (error) { throw error }
}

async function buscarAlunoPorId(id) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM aluno WHERE id = $1`
        const values = [id]
        const idAluno = await client.query(sql, values)

        client.end()
        return idAluno.rows[0]
    } catch (error) { throw error }
}

async function buscarAlunoPorCpf(cpf) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM aluno WHERE cpf = $1`
        const values = [cpf]
        const cpfAluno = await client.query(sql, values)

        client.end()
        return cpfAluno.rows[0]
    } catch (error) { throw error }
}


// Update
async function atualizarAluno(id, alunos) {
    const client = await connect()

    try {
        const sql = `UPDATE aluno SET sexo          = $1, 
                                      nome          = $2,
                                      cpf           = $3, 
                                      dt_nascimento = $4, 
                                      telefone      = $5, 
                                      email         = $6, 
                                      status        = $7, 
                                      plano         = $8
                                WHERE id = $9 RETURNING *`
        const values = [alunos.sexo, alunos.nome, alunos.cpf, alunos.dt_nascimento, alunos.telefone, alunos.email,
        alunos.status, alunos.plano, id]
        const alunoAtualizado = await client.query(sql, values)

        client.end()
        return alunoAtualizado.rows[0]
    } catch (error) { throw error }
}

// Delete
async function deletarAluno(id) {
    let alunoDeletado
    const client = await connect()

    try {
        await client.query('BEGIN')
        const sqlPag = 'DELETE FROM pagamento WHERE id_aluno = $1 RETURNING *'
        const valuesPag = [id]
        const pag = await client.query(sqlPag, valuesPag)

        const sqlTreino = `DELETE FROM treino WHERE idAluno = $1 RETURNING *`
        const valuesTreino = [id]
        const treino = await client.query(sqlTreino, valuesTreino)

        const sqlAvaliacao = `DELETE FROM avaliacao WHERE idAluno = $1 RETURNING *`
        const valuesAvaliacao = [id]
        const avaliacao = await client.query(sqlAvaliacao, valuesAvaliacao)

        const sqlTarefas = `DELETE FROM tarefas WHERE idAluno = $1 RETURNING *`
        const valuesTarefas = [id]
        const tarefas = await client.query(sqlTarefas, valuesTarefas)

        const sql = `DELETE FROM aluno WHERE id = $1 RETURNING *`
        const values = [id]
        alunoDeletado = await client.query(sql, values)

        await client.query('COMMIT')
        return { aluno: alunoDeletado.rows[0], pagamento: pag.rows[0], treino: treino.rows[0], avaliacao: avaliacao.rows[0], tarefas: tarefas.rows[0] }
    } catch (error) {

        await client.query('ROLLBACK');

        throw error;
    } finally { client.end() }
}

async function buscarAlunoPersonal(idUsuario) {
    const client = await connect()
    
    try {
        const sql = `SELECT * FROM aluno WHERE idUsuario = $1 ORDER BY id`
        const value = [idUsuario]
        const alunoPersonal = await client.query(sql, value)
        
        client.end()
        return alunoPersonal.rows
    } catch (error) { throw error }
}

async function buscarAlunoPagamento(idUsuario) {
    const client = await connect()
    
    try {
        const sql = `SELECT aluno.id, pag.id, pag.dt_pagamento, pag.status, pag.valor FROM pagamento AS pag
                     INNER JOIN aluno ON aluno.id = pag.id_aluno
                     WHERE aluno.idUsuario = $1 ORDER BY pag.id_aluno`
        const value = [idUsuario]
        const alunoPersonal = await client.query(sql, value)
        
        client.end()
        return alunoPersonal.rows
    } catch (error) { throw error }
}

module.exports = {
    addAluno,
    buscarAluno,
    buscarAlunoPorNome,
    buscarAlunoPorEmail,
    buscarAlunoPorId,
    buscarAlunoPorCpf,
    atualizarAluno,
    deletarAluno,
    buscarAlunoPersonal,
    buscarAlunoPagamento
}