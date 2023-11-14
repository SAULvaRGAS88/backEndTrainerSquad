const connect = require("../db");

async function addAval(idAluno, aval) {
    const client = await connect()

    try {
        // const currentDateUTC = new Date().toISOString();
        const sql = `INSERT INTO avaliacao(qtd, objetivo, data, peso, altura, imc, idade, sexo, circ_punho, 
                        circ_abd, circ_gluteo, massa_gordura, porc_gordura, massa_magra, porc_massa_musc,
                        massa_musc, idAluno)
                     VALUES ((SELECT count(idAluno) + 1 FROM avaliacao WHERE idAluno = $1), $2, NOW(), $3, $4, $5, $6, $7, $8, $9,
                             $10, $11, $12, $13, $14, $15, $16) RETURNING *`
        const values = [idAluno, aval.objetivo, aval.peso, aval.altura, aval.imc, aval.idade, aval.sexo, aval.circ_punho, 
                        aval.circ_abd, aval.circ_gluteo, aval.massa_gordura, aval.porc_gordura, aval.massa_magra, 
                        aval.porc_massa_musc, aval.massa_musc, idAluno]
        const avaliacao = await client.query(sql, values)                

        await client.end()
        return avaliacao.rows[0]
    } catch (error) { throw error }
}

async function buscarAvaliacoes() {
    const client = await connect()
    
    try {
        const sql = `SELECT * FROM avaliacao ORDER BY id`
        const avaliacoes = await client.query(sql)

        await client.end()
        return avaliacoes.rows
    } catch (error) { throw error }
}

// async function buscarAvaliacoesAluno(idAluno) {
//     const client = await connect()

//     try {
//         const sql = `SELECT aluno.nome, avaliacao.* FROM avaliacao INNER JOIN aluno ON aluno.id = avaliacao.idAluno WHERE avaliacao.idAluno = $1`
//         const values = [idAluno]
//         const treinoAluno = await client.query(sql, values)

//         await client.end()
//         return treinoAluno.rows
//     } catch (error) { throw error }
// }

async function buscarAvaliacoesAluno(idUsuario) {
    const client = await connect()

    try {
        const sql = `SELECT aluno.nome, avaliacao.* FROM avaliacao 
                     INNER JOIN aluno ON aluno.id = avaliacao.idAluno 
                     WHERE aluno.idUsuario = $1`
        const values = [idUsuario]
        const treinoAluno = await client.query(sql, values)

        await client.end()
        return treinoAluno.rows
    } catch (error) { throw error }
}

async function atualizarAvaliacao(id, aval) {
    const client = await connect()

    try {
        const sql = `UPDATE avaliacao SET peso              = $1,
                                          altura            = $2,
                                          nome              = $3,
                                          dt_aval           = $4,
                                          sexo              = $5,
                                          idade             = $6,
                                          circ_punho        = $7,
                                          circ_abd          = $8,
                                          circ_gluteo       = $9,
                                          porc_gordura      = $10,
                                          massa_gordura     = $11,
                                          massa_magra       = $12,
                                          porc_massa_musc   = $13,
                                          massa_muscu       = $14,
                                          ingestao_calorica = $15,
                                          taxa_metabolica   = $16,
                                          diferenca         = $17
                                WHERE id = $18 RETURNING *`
        const values = [aval.peso, aval.altura, aval.nome, aval.dt_aval, aval.sexo, aval.idade, aval.circ_punho, aval.circ_abd, 
                        aval.circ_gluteo, aval.porc_gordura, aval.massa_gordura, aval.massa_magra, aval.porc_massa_musc, aval.massa_muscu,
                        aval.ingestao_calorica, aval.taxa_metabolica, aval.diferenca, id]
        const avaliacaoAtualizada = await client.query(sql, values)

        await client.end()
        return avaliacaoAtualizada.rows[0]
    } catch (error) { throw error }
}

async function deletarAvaliacao(id) {
    const client = await connect()

    try {
        const sql = `DELETE FROM avaliacao WHERE id = $1 RETURNING *`
        const values = [id]
        const avaliacaoDeletada = await client.query(sql, values)

        await client.end()
        return avaliacaoDeletada.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    addAval,
    buscarAvaliacoes,
    buscarAvaliacoesAluno,
    atualizarAvaliacao,
    deletarAvaliacao
}