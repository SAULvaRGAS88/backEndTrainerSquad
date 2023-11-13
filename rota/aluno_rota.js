const express = require('express')
const controller = require('../controller/aluno_controller')

const router = express.Router()


router.post('/aluno/:id', controller.addAluno)
router.get('/alunos', controller.buscarAluno) // listar
router.get('/nome/:nome', controller.buscarAlunoPorNome)
router.get('/email/:email', controller.buscarAlunoPorEmail)
router.get('/:id', controller.buscarAlunoPorId)
router.get('/:id/aluno', controller.buscarAlunoPersonal)
router.get('/cpf/:cpf', controller.buscarAlunoPorCpf)
router.put('/:id', controller.atualizarAluno)
router.delete('/:id', controller.deletarAluno)

module.exports = router