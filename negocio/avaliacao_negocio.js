const { buscarAlunoPorId } = require('../persistencia/aluno_persistencia')
const persistencia = require('../persistencia/avaliacao_persistencia')

async function addAval(idAluno, aval) {
    const id = await buscarAlunoPorId(idAluno)
    if (!id) {
        throw ({status: 404, message: "ID do aluno não existe"})
    }
    if (aval && aval.objetivo && aval.peso && aval.altura && aval.imc && aval.idade && aval.sexo && aval.circ_punho
        && aval.circ_abd && aval.circ_gluteo && aval.massa_gordura && aval.porc_gordura && aval.massa_magra && aval.porc_massa_musc
        && aval.massa_musc && idAluno) {
            try {
                const avaliacao = await persistencia.addAval(idAluno, aval)
                return avaliacao
            } catch (error) { throw error }
        } else {
            const erro = new Error()
            erro.message = "Todos os campos são obrigatórios."
            erro.status = 400
            throw erro
        }
}

async function buscarAvaliacoes() {
    try {
        const avaliacao = await persistencia.buscarAvaliacoes()
        
        if (avaliacao.length == 0) {
            const erro = new Error()
            erro.message = "Não há avaliações cadastradas."
            erro.status = 404
            throw erro
        }
        
        return avaliacao
    } catch (error) { throw error }
}

async function buscarAvaliacoesAluno(idUsuario) {
    try {
        const avaliacaoAluno = await persistencia.buscarAvaliacoesAluno(idUsuario)

        if (avaliacaoAluno.length == 0) {
            const erro = new Error()
            erro.message = "Avaliação não encontrada."
            erro.status = 404
            throw erro
        }

        return avaliacaoAluno
    } catch (error) { throw error }
}

async function atualizarAvaliacao(id, aval) {
    if (aval && aval.peso && aval.altura && aval.nome && aval.dt_aval && aval.sexo && aval.idade && aval.circ_punho && aval.circ_abd
        && aval.circ_gluteo && aval.porc_gordura && aval.massa_gordura && aval.massa_magra && aval.porc_massa_musc && aval.massa_muscu
        && aval.ingestao_calorica && aval.taxa_metabolica && aval.diferenca) {
            const avaliacaoAtualizada = await persistencia.atualizarAvaliacao(id, aval)

            if (!avaliacaoAtualizada) {
                let erro = new Error()
                erro.message = "Avaliação não encontrada."
                erro.status = 404
                throw erro
            } 

            return avaliacaoAtualizada
        } else {
            let erro = new Error()
            erro.message = "Todos os campos são obrigatórios."
            erro.status = 400
            throw erro
        }
}

async function deletarAvaliacao(id) {
    try {
        const avaliacaoDeletada = await persistencia.deletarAvaliacao(id)

        if (!avaliacaoDeletada) {
            let erro = new Error()
            erro.message = "Avaliação não encontrada."
            erro.status = 404
            throw erro
        } 

        return avaliacaoDeletada
    } catch (error) { throw error }
}

module.exports = {
    addAval,
    buscarAvaliacoes,
    buscarAvaliacoesAluno,
    atualizarAvaliacao,
    deletarAvaliacao
}
