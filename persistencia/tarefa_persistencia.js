const connect = require("../db");

async function addTask(idAluno, task) {
    const client = await connect()

    try {
        const sql = `INSERT INTO tarefas(data, hora, tarefa, nomeAluno, idAluno) 
                     VALUES($1, $2, $3, (SELECT nome FROM aluno WHERE id = $4), $5) RETURNING *`
        const values = [task.data, task.hora, task.tarefa, idAluno, idAluno]

        const tasks = await client.query(sql, values)
        await client.end()
        return tasks.rows[0]
    } catch (error) { throw error }
}

async function buscarTasks() {
    const client = await connect()

    try {
        const sql = `SELECT * FROM tarefas`
        const allTasks = await client.query(sql) 
        
        await client.end()
        return allTasks.rows
    } catch (error) { throw error }
}

async function buscarTasksPersonal(idUsuario) {
    const client = await connect()

    try {
        const sql = `SELECT tarefas.* FROM tarefas
                     INNER JOIN aluno ON aluno.id = tarefas.idAluno
                     WHERE aluno.idUsuario = $1`
        const value = [idUsuario]
        const allTasks = await client.query(sql, value) 
        
        await client.end()
        return allTasks.rows
    } catch (error) { throw error }
}

async function buscarAlunoTask(idAluno) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM tarefas WHERE idAluno = $1`
        const value = [idAluno]
        const taskAluno = await client.query(sql, value)

        await client.end()
        return taskAluno.rows
    } catch (error) { throw error }
}

async function buscarTaskDataAsc() {
    const client = await connect()

    try {
        const sql = `SELECT * FROM tarefas ORDER BY data`
        const taskData = await client.query(sql)

        await client.end()
        return taskData.rows
    } catch (error) { throw error }
}

async function buscarTaskDataDesc() {
    const client = await connect()

    try {
        const sql = `SELECT * FROM tarefas ORDER BY data DESC`
        const taskData = await client.query(sql)

        await client.end()
        return taskData.rows
    } catch (error) { throw error }
}

async function buscarTaskDataAtual() {
    const client = await connect()

    try {
        const sql = `SELECT * FROM tarefas WHERE data >= NOW() ORDER BY data `
        const taskData = await client.query(sql)

        await client.end()
        return taskData.rows
    } catch (error) { throw error }
}

async function buscarTaskDataAluno(idAluno) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM tarefas WHERE idAluno = $1 ORDER BY data`
        const value = [idAluno]
        const taskData = await client.query(sql, value)

        await client.end()
        return taskData.rows
    } catch (error) { throw error }
}

async function atualizarTask(id, task) {
    const client = await connect()

    try {
        const sql = `UPDATE tarefas SET data   = $1,
                                        hora   = $2,
                                        tarefa = $3 WHERE id = $4 RETURNING *`
        const values = [task.data, task.hora, task.tarefa, id]
        const taskAtualizada = await client.query(sql, values)

        await client.end()
        return taskAtualizada.rows[0]
    } catch (error) { throw error }
}

async function deletarTask(id) {
    const client = await connect()

    try {
        const sql = `DELETE FROM tarefas WHERE id = $1 RETURNING *`
        const value = [id]
        const taskDeletada = await client.query(sql, value)

        await client.end()
        return taskDeletada.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    addTask,
    buscarTasks,
    buscarTasksPersonal,
    buscarAlunoTask,
    buscarTaskDataAsc,
    buscarTaskDataDesc,
    buscarTaskDataAtual,
    buscarTaskDataAluno,
    atualizarTask,
    deletarTask
}