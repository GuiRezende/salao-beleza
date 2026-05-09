const { Router } = require("express")
const router = Router()
const { getClientes, getCliente, postCliente, patchCliente, deleteCliente } = require("../controller/clienteController")

router.get('/', getClientes)
router.get('/:id', getCliente)
router.post('/', postCliente)
router.patch('/:id', patchCliente)
router.delete('/:id', deleteCliente)

module.exports = router