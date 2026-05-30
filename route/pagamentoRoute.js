import { Router } from "express"
const router = Router()
import { getPagamentos, getPagamento, postPagamento, patchPagamento, deletePagamento } from "../controller/pagamentoController.js"

router.get('/', getPagamentos)
router.get('/:id', getPagamento)
router.post('/', postPagamento)
router.patch('/:id', patchPagamento)
router.delete('/:id', deletePagamento)

export default router