const express = require('express')
const controller = require('../controller/avaliacao_controller')

const router = express.Router()

router.post('/:id', controller.addAval)
router.get('/', controller.buscarAvaliacoes)
router.get('/:id', controller.buscarAvaliacoesAluno)
router.put('/:id', controller.atualizarAvaliacao)
router.delete('/:id', controller.deletarAvaliacao)

module.exports = router