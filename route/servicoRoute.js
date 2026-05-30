import { Router } from "express"
const router = Router()
import { getServicos, getServico, postServico, patchServico, deleteServico } from "../controller/servicoController.js"

router.get('/', getServicos)
router.get('/:id', getServico)
router.post('/', postServico)
router.patch('/:id', patchServico)
router.delete('/:id', deleteServico)

export default router