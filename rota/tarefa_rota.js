const express = require('express')
const controller = require('../controller/tarefa_controller')

const router = express.Router()

router.post('/:id', controller.addTask)
router.get('/', controller.buscarTasks)
router.get('/:id', controller.buscarTasksPersonal)
router.get('/aluno/:id', controller.buscarAlunoTask)
router.get('/dateAsc', controller.buscarTaskDataAsc)
router.get('/dateDesc', controller.buscarTaskDataDesc)
router.get('/dateAtual', controller.buscarTaskDataAtual)
router.get('/date/:id', controller.buscarTaskDataAluno)
router.put('/:id', controller.atualizarTask)
router.delete('/:id', controller.deletarTask)

module.exports = router