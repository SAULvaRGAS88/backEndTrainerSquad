const persistencia = require('../persistencia/pagamento_persistencia')

// Iniciando CRUD

// Create
// PAGAMENTO

async function addPagamento(idAluno, pagamento) {
    if (pagamento && idAluno && pagamento.dt_pagamento && pagamento.status && pagamento.valor) {
        try {
            const pagamentos = await persistencia.addPagamento(idAluno, pagamento)
            return pagamentos
        } catch (error) { throw error }
    } else {
        const erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}


async function buscarPagamento() {
    try {
        const pagamento = await persistencia.buscarPagamento()

        if (pagamento.length == 0) {
            const erro = new Error()
            erro.message = "Não há pagamentos cadastrados."
            erro.status = 404
            throw erro
        }

        return pagamento
    } catch (error) { throw error }
}


async function buscarPagamentoPorId(id) {
    try {
        const idPagamento = await persistencia.buscarPagamentoPorId(id)

        if (!idPagamento) {
            const erro = new Error()
            erro.message = "Id não encontrado."
            erro.status = 404
            throw erro
        }

        return idPagamento
    } catch { throw error }
}

// Update
async function atualizarPagamento(id, pagamentos) {
    if (pagamentos && pagamentos.dt_pagamento && pagamentos.status && pagamentos.valor) {
        const pagamentoAtualizado = await persistencia.atualizarAluno(id, pagamentos)

        if (!pagamentoAtualizado) {
            let erro = new Error()
            erro.message = "Pagamento não encontrado."
            erro.status = 404
            throw erro
        }

        return pagamentoAtualizado
    } else {
        let erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}


// Delete
async function deletarPagamento(id) {
    try {
        const pagamentoDeletado =  await persistencia.deletarPagamento(id)

        if (!pagamentoDeletado) {
            const erro = new Error()
            erro.message = "Pagamento não encontrado"
            erro.status = 404
            throw erro
        }

        return pagamentoDeletado
    } catch (error) { throw error }
}


module.exports = {
    addPagamento,
    buscarPagamento,
    buscarPagamentoPorId,
    atualizarPagamento,
    deletarPagamento
}