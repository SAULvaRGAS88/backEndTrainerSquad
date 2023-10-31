const persistencia = require('../persistencia/treino_persistencia')

async function addTreino(idAluno, treino) {
    if (treino && treino.carga && treino.serie && treino.exercicio && treino.tipo && treino.repeticao && idAluno) {
        try {
            const treinos = await persistencia.addTreino(idAluno, treino)
            return treinos
        } catch (error) { throw error }
    } else {
        const erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

async function buscarTreino() {
    try {
        const treino = await persistencia.buscarTreino()
        
        if (treino.length == 0) {
            const erro = new Error()
            erro.message = "Não há treinos cadastrados."
            erro.status = 404
            throw erro
        }

        return treino
    } catch (error) { throw error }
}

async function buscarTreinoAluno(idAluno) {
    try {
        const treinoAluno = await persistencia.buscarTreinoAluno(idAluno)

        if (treinoAluno.length == 0) {
            const erro = new Error()
            erro.message = "Treino não encontrado."
            erro.status = 404
            throw erro
        }

        return treinoAluno
    } catch (error) { throw error }
}

async function buscarTreinoTipo(tipo) {
    try {
        const tipos = await persistencia.buscarTreinoTipo(tipo)

        if (tipos.length == 0) {
            const erro = new Error()
            erro.message = "Tipo de treino não encontrado."
            erro.status = 404
            throw erro
        }

        return tipos
    } catch (error) { throw error }
}

async function atualizarTreino(id, treino) {
    if (treino && treino.carga && treino.serie && treino.exercicio && treino.tipo && treino.repeticao) {
        const treinoAtualizado = await persistencia.atualizarTreino(id, treino)

        if (!treinoAtualizado) {
            let erro = new Error()
            erro.message = "Treino não encontrado."
            erro.status = 404
            throw erro
        } 

        return treinoAtualizado
    } else {
        let erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

async function deletarTreino(id) {
    try {
        const treinoDeletado = await persistencia.deletarTreino(id)

        if (!treinoDeletado) {
            let erro = new Error()
            erro.message = "Treino não encontrado."
            erro.status = 404
            throw erro 
        }

        return treinoDeletado
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