<<<<<<< HEAD
// const { Client } = require('pg')
// const { conexao } = require('./conexao')
const connect = require("../db");

=======
const connect = require("../db");
>>>>>>> devPaola

// Create
async function addPagamento(idAluno, pagamento) {
    const client = await connect()

    try {
        const sql = `INSERT INTO pagamento(id_aluno, dt_pagamento, status, valor) 
                     VALUES ($1, $2, $3, $4) RETURNING *`
        const values = [idAluno, pagamento.dt_pagamento, pagamento.status, pagamento.valor]

        const pagamentos = await client.query(sql, values) 

        await client.end()
        return pagamentos.rows[0]
    } catch (error) { throw error }
}

// Read
async function buscarPagamento() {
    const client = await connect()

    try {
        const sql = `SELECT * FROM pagamento`
        const pagamento = await client.query(sql)

        client.end()
        return pagamento.rows
    } catch (error) { throw error }
}

async function buscarPagamentoPorId(id) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM pagamento WHERE id = $1`
        const values = [id]
        const idPagamento = await client.query(sql, values)

        client.end()
        return idPagamento.rows[0]
    } catch (error) { throw error }
}

// Update
async function atualizarPagamento(id, pagamentos) {
    const client = await connect()

    try {
        const sql = `UPDATE pagamento SET dt_pagamento = $1, status = $2, valor = $3 WHERE id = $4 RETURNING *`
        const values = [pagamentos.dt_pagamento, pagamentos.status, pagamentos.valor, id]
        const pagamentoAtualizado = await client.query(sql, values)

        client.end()
        return pagamentoAtualizado.rows[0]
    } catch (error) { throw error }
}

// Delete
async function deletarPagamento(id) {
    const client = await connect()

    try {
        const sql = `DELETE FROM pagamento WHERE id = $1 RETURNING *`
        const values = [id]
        const pagamentoDeletado = await client.query(sql, values)

        client.end()
        return pagamentoDeletado.rows[0]
    } catch (error) { throw error }
}



module.exports = {
    addPagamento,
    buscarPagamento,
    atualizarPagamento,
    buscarPagamentoPorId,
    deletarPagamento
}