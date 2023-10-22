const persistencia = require('../persistencia/avaliacao_persistencia')

async function addAval(idAluno, aval) {
    if (aval && aval.peso && aval.altura && aval.nome && aval.dt_aval && aval.sexo && aval.idade && aval.circ_punho
        && aval.circ_abd && aval.circ_gluteo && aval.porc_gordura && aval.massa_gordura && aval.massa_magra && aval.porc_massa_musc
        && aval.massa_muscu && aval.ingestao_calorica && aval.taxa_metabolica && aval.diferenca && idAluno) {
            try {
                const avaliacao = await persistencia.addAval(idAluno, aval)
                return avaliacao
            } catch (error) { throw error }
        } else {
            console.log("Campos ausentes no corpo da solicitação:", Object.keys(aval).filter(key => !aval[key]));
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

async function buscarAvaliacoesAluno(idAluno) {
    try {
        const avaliacaoAluno = await persistencia.buscarAvaliacoesAluno(idAluno)

        if (!avaliacaoAluno) {
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
