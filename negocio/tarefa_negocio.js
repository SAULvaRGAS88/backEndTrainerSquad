const persistencia = require('../persistencia/tarefa_persistencia')
const { buscarAlunoPorId } = require('../persistencia/aluno_persistencia')
const { all } = require('../rota/personal_rota')

async function addTask(idAluno, task) {
    const id = await buscarAlunoPorId(idAluno)
    if (!id) {
        throw ({status: 404, message: "ID do aluno não existe"})
    }

    if (task && task.data && task.hora && task.tarefa && idAluno) {
        try {
            const tasks = await persistencia.addTask(idAluno, task)
            return tasks
        } catch (error) { throw error }
    } else {
        const erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

async function buscarTasks() {
    try {
        const allTasks = await persistencia.buscarTasks()

        if (allTasks.length == 0) {
            const erro = new Error()
            erro.message = "Não há tarefas cadastradas."
            erro.status = 404
            throw erro
        }

        return allTasks
    } catch (error) { throw error }
}

async function buscarAlunoTask(idAluno) {
    try {
        const taskAluno = await persistencia.buscarAlunoTask(idAluno)

        if (taskAluno.length == 0) {
            const erro = new Error()
            erro.message = "Tarefa não encontrada."
            erro.status = 404
            throw erro
        }

        return taskAluno
    } catch (error) { throw error }
}

async function buscarTaskDataAsc() {
    try {
        const taskData = await persistencia.buscarTaskDataAsc()

        if (taskData.length == 0) {
            const erro = new Error()
            erro.message = "Não há tarefas cadastradas."
            erro.status = 404
            throw erro
        }

        return taskData
    } catch (error) { throw error }
}

async function buscarTaskDataDesc() {
    try {
        const taskData = await persistencia.buscarTaskDataDesc()

        if (taskData.length == 0) {
            const erro = new Error()
            erro.message = "Não há tarefas cadastradas."
            erro.status = 404
            throw erro
        }

        return taskData
    } catch (error) { throw error }
}

async function buscarTaskDataAtual() {
    try {
        const taskData = await persistencia.buscarTaskDataAtual()

        if (taskData.length == 0) {
            const erro = new Error()
            erro.message = "Não há tarefas cadastradas."
            erro.status = 404
            throw erro
        }

        return taskData
    } catch (error) { throw error }
}

async function buscarTaskDataAluno(idAluno) {
    const id = await buscarAlunoPorId(idAluno)
    if (!id) {
        throw ({status: 404, message: "ID do aluno não existe"})
    }

    try {
        const taskDataAluno = await persistencia.buscarTaskDataAluno(idAluno)
        
        if (taskDataAluno.length == 0) {
            const erro = new Error()
            erro.message = "Não há tarefas cadastradas."
            erro.status = 404
            throw erro
        }

        return taskDataAluno
    } catch (error) { throw error }
}

async function atualizarTask(id, task) {
    if (task && task.data && task.hora && task.tarefa) {
        const taskAtualizada = await persistencia.atualizarTask(id, task)

        if (!taskAtualizada) {
            let erro = new Error()
            erro.message = "Tarefa não encontrada."
            erro.status = 404
            throw erro
        } 

        return taskAtualizada
    } else {
        let erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

async function deletarTask(id) {
    try {
        const taskDeletada = await persistencia.deletarTask(id)

        if (!taskDeletada) {
            let erro = new Error()
            erro.message = "Tarefa não encontrada."
            erro.status = 404
            throw erro
        } 

        return taskDeletada
    } catch (error) { throw error }
}

module.exports = {
    addTask,
    buscarTasks,
    buscarAlunoTask,
    buscarTaskDataAsc,
    buscarTaskDataDesc,
    buscarTaskDataAtual,
    buscarTaskDataAluno,
    atualizarTask,
    deletarTask
}