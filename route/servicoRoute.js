import { Router } from "express"
const router = Router()
import { getServicos, getServico, getServicoPorNome, postServico, patchServico, deleteServico } from "../controller/servicoController.js"

router.get('/', getServicos)
router.get('/:id', getServico)
router.post('/', postServico)
router.patch('/:id', patchServico)
router.delete('/:id', deleteServico)
router.get('/nome/:nome', getServicoPorNome)

export default router