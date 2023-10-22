const negocio = require('../negocio/pagamento_negocio')

// Iniciando CRUD

// Create
// PAGAMENTO

async function addPagamento(req, res) {
    const idAluno = req.params.id
    const pagamento = req.body

    try {
        const pagamentos = await negocio.addPagamento(idAluno, pagamento)
        res.status(201).json(pagamentos)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function buscarPagamento(req, res) {
    const pagamento = req.body

    try {
        const pagamentos = await negocio.buscarPagamento(pagamento)
        res.status(200).json(pagamentos)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}


async function buscarPagamentoPorId(req, res) {
    const id = req.params.id

    try {
        const idPagamento = await negocio.buscarPagamentoPorId(id)
        res.status(200).json(idPagamento)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"}) 
        }
    }
}

// Update
async function atualizarPagamento(req, res) {
    const id = req.params.id
    const pagamento = req.body

    try {
        const pagamentoAtualizado = await negocio.atualizarPagamento(id, pagamento)
        res.status(200).json(pagamentoAtualizado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

// Delete
async function deletarPagamento(req, res) {
    const id = req.params.id

    try {
        const pagamentoDeletado = await negocio.deletarPagamento(id)
        res.status(200).json(pagamentoDeletado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

module.exports = {
    addPagamento,
    buscarPagamento,
    buscarPagamentoPorId,
    atualizarPagamento,
    deletarPagamento   
}