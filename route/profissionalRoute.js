import { Router } from "express"
const router = Router()
import { getProfissionais, getProfissional, postProfissional, patchProfissional, deleteProfissional } from "../controller/profissionalController.js"

router.get('/', getProfissionais)
router.get('/:id', getProfissional)
router.post('/', postProfissional)
router.patch('/:id', patchProfissional)
router.delete('/:id', deleteProfissional)

export default router