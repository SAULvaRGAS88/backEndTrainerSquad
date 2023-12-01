const negocio = require('../negocio/tarefa_negocio')

async function addTask(req, res) {
    const idAluno = req.params.id
    const task = req.body

    try {
        const tasks = await negocio.addTask(idAluno, task)
        res.status(201).json(tasks)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            console.log(error)
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function buscarTasks(req, res) {
    const allTasks = req.body

    try {
        const tasks = await negocio.buscarTasks(allTasks)
        res.status(200).json(tasks)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            console.log(error)
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function buscarAlunoTask(req, res) {
    const idAluno = req.params.id

    try {
        const alunoTask = await negocio.buscarAlunoTask(idAluno)
        res.status(200).json(alunoTask)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            console.log(error)
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function buscarTaskDataAsc(req, res) {
    const dataTasks = req.body

    try {
        const tasks = await negocio.buscarTaskDataAsc(dataTasks)
        res.status(200).json(tasks)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            console.log(error)
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function buscarTaskDataDesc(req, res) {
    const dataTasks = req.body

    try {
        const tasks = await negocio.buscarTaskDataDesc(dataTasks)
        res.status(200).json(tasks)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            console.log(error)
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function buscarTaskDataAtual(req, res) {
    const dataTasks = req.body

    try {
        const tasks = await negocio.buscarTaskDataAtual(dataTasks)
        res.status(200).json(tasks)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            console.log(error)
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function buscarTaskDataAluno(req, res) {
    const idAluno = req.params.id
    const dataAluno = req.body

    try {
        const tasks = await negocio.buscarTaskDataAluno(idAluno, dataAluno)
        res.status(200).json(tasks)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            console.log(error)
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function atualizarTask(req, res) {
    const id = req.params.id
    const task = req.body

    try {
        const taskAtualizada = await negocio.atualizarTask(id, task)
        res.status(200).json(taskAtualizada)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            console.log(error)
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function deletarTask(req, res) {
    const id = req.params.id

    try {
        const taskDeletada = await negocio.deletarTask(id)
        res.status(200).json(taskDeletada)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            console.log(error)
            res.status(500).json({message: "Erro interno!"})
        }
    }
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