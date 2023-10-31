const persistencia = require('../persistencia/aluno_persistencia')

// Iniciando CRUD

// Create

async function addAluno(idUsuario, aluno) {
    if (aluno && aluno.sexo && aluno.nome && aluno.cpf && aluno.dt_nascimento && aluno.telefone && aluno.email && aluno.status
        && aluno.plano && idUsuario) {
            const alunoBuscadoPorCpf = await persistencia.buscarAlunoPorCpf(aluno.cpf);
            if(!alunoBuscadoPorCpf) {
                try {
                    const alunoAdd = await persistencia.addAluno(idUsuario, aluno)
                    return alunoAdd                    
                } catch (error) { throw  error }
           
        } else { throw { id: 402, mensagem: "Aluno já cadastrado!"} }
    } else {
            const erro = new Error()
            erro.message = "Todos os campos são obrigatórios."
            erro.status = 400
            throw erro
        }
}


// Read
async function buscarAluno() {
    try {
        const aluno = await persistencia.buscarAluno()

        if (aluno.length == 0) {
            const erro = new Error()
            erro.message = "Não há alunos cadastrados."
            erro.status = 404
            throw erro
        }

        return aluno
    } catch (error) { throw error }
}

async function buscarAlunoPorNome(nome) {
    try {
        const nomeAluno = await persistencia.buscarAlunoPorNome(nome)

        if (!nomeAluno) {
            const erro = new Error()
            erro.message = "Nome não encontrado."
            erro.status = 404
            throw erro
        }

        return nomeAluno
    } catch { throw error }
}

async function buscarAlunoPorEmail(email) {
    try {
        const emailAluno = await persistencia.buscarAlunoPorEmail(email)

        if (!emailAluno) {
            const erro = new Error()
            erro.message = "E-mail não encontrado."
            erro.status = 404
            throw erro
        }

        return emailAluno
    } catch { throw error }
}

async function buscarAlunoPorId(id) {
    try {
        const idAluno = await persistencia.buscarAlunoPorId(id)

        if (!idAluno) {
            const erro = new Error()
            erro.message = "Id não encontrado."
            erro.status = 404
            throw erro
        }

        return idAluno
    } catch { throw error }
}

async function buscarAlunoPorCpf(cpf) {
    try {
        const cpfAluno = await persistencia.buscarAlunoPorCpf(cpf)

        if (!cpfAluno) {
            const erro = new Error()
            erro.message = "CPF não encontrado."
            erro.status = 404
            throw erro
        }

        return cpfAluno
    } catch { throw error }
}

// Update
async function atualizarAluno(id, alunos) {
    if (alunos && alunos.nome && alunos.email) {
        const alunoAtualizado = await persistencia.atualizarAluno(id, alunos)

        if (!alunoAtualizado) {
            let erro = new Error()
            erro.message = "Aluno não encontrado."
            erro.status = 404
            throw erro
        }

        return alunoAtualizado
    } else {
        let erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

// Delete
async function deletarAluno(id) {
    
    try {
        const clienteDeletado =  await persistencia.deletarAluno(id)

        if (!clienteDeletado) {
            const erro = new Error()
            erro.message = "Aluno não encontrado"
            erro.status = 404
            throw erro
        }

        return clienteDeletado
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
    deletarAluno
}