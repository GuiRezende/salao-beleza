import { Router } from "express"
const router = Router()
import { getClientes, getCliente, postCliente, patchCliente, deleteCliente } from "../controller/clienteController.js"

router.get('/', getClientes)
router.get('/:id', getCliente)
router.post('/', postCliente)
router.patch('/:id', patchCliente)
router.delete('/:id', deleteCliente)

export default router