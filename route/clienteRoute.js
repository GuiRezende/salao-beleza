import { Router } from "express"
const router = Router()
import { getClientes, getCliente, getClientePorNome, postCliente, patchCliente, deleteCliente } from "../controller/clienteController.js"

router.get('/', getClientes)
router.get('/:id', getCliente)
router.get('/nome/:nome', getClientePorNome)
router.post('/', postCliente)
router.patch('/:id', patchCliente)
router.delete('/:id', deleteCliente)

export default router