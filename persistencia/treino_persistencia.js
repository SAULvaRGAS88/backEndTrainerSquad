// const { Client } = require('pg')
// const { conexao } = require('./conexao')
const connect = require("../db");

async function addTreino(idAluno, treino) {
    const client = await connect()

    try {
        const sql = `INSERT INTO treino(obs, carga, serie, exercicio, tipo, repeticao, idAluno)
                                 VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`
        const values = [treino.obs, treino.carga, treino.serie, treino.exercicio, treino.tipo, treino.repeticao, idAluno]

        const treinos = await client.query(sql, values) 

        await client.end()
        return treinos.rows[0]
    } catch (error) { throw error }
}

async function buscarTreino() {
    const client = await connect()

    try {
        const sql = `SELECT * FROM treino ORDER BY id`
        const treino = await client.query(sql)

        await client.end()
        return treino.rows
    } catch (error) { throw error }
}

async function buscarTreinoAluno(idAluno) {
    const client = await connect()

    try {
        const sql = `SELECT aluno.nome, treino.* FROM treino INNER JOIN aluno ON aluno.id = treino.idAluno WHERE treino.idAluno = $1`
        const values = [idAluno]
        const treinoAluno = await client.query(sql, values)

        await client.end()
        return treinoAluno.rows
    } catch (error) { throw error }
}

async function buscarTreinoTipo(tipo) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM treino WHERE tipo = $1`
        const values = [tipo]
        const tipos = await client.query(sql, values)

        await client.end()
        return tipos.rows
    } catch (error) { throw error }
}

async function atualizarTreino(id, treino) {
    const client = await connect()

    try {
        const sql = `UPDATE treino SET obs      = $1,
                                      carga     = $2,
                                      serie     = $3,
                                      exercicio = $4,
                                      tipo      = $5,
                                      repeticao = $6
                            WHERE id = $7 RETURNING *`
        const values = [treino.obs, treino.carga, treino.serie, treino.exercicio, treino.tipo, treino.repeticao, id]
        const treinoAtualizado = await client.query(sql, values)

        await client.end()
        return treinoAtualizado.rows[0]
    } catch (error) { throw error }
}

async function deletarTreino(id) {
    const client = await connect()

    try {
        const sql = `DELETE FROM treino WHERE id = $1 RETURNING *`
        const values = [id]
        const treinoDeletado = await client.query(sql, values)

        await client.end()
        return treinoDeletado.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    addTreino,
    buscarTreino,
    buscarTreinoAluno,
    buscarTreinoTipo,
    atualizarTreino,
    deletarTreino
}