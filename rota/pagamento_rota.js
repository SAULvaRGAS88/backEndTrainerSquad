const express = require('express')
const controller = require('../controller/pagamento_controller')

const router = express.Router()


router.post('/pagamento/:id', controller.addPagamento)
router.get('/pagamentos', controller.buscarPagamento)
router.get('/:id', controller.buscarPagamentoPorId)
router.put('/:id', controller.atualizarPagamento)
router.delete('/:id', controller.deletarPagamento)

module.exports = router