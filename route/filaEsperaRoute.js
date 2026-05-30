import { Router } from "express"
const router = Router()
import { getFilaEsperas, getFilaEspera, postFilaEspera, patchFilaEspera, deleteFilaEspera } from "../controller/filaEsperaController.js"

router.get('/', getFilaEsperas)
router.get('/:id', getFilaEspera)
router.post('/', postFilaEspera)
router.patch('/:id', patchFilaEspera)
router.delete('/:id', deleteFilaEspera)

export default router