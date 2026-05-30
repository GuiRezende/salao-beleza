import { Router } from "express"
const router = Router()
import { getAgendamentos, getAgendamento, postAgendamento, patchAgendamento, deleteAgendamento } from "../controller/agendamentoController.js"

router.get('/', getAgendamentos)
router.get('/:id', getAgendamento)
router.post('/', postAgendamento)
router.patch('/:id', patchAgendamento)
router.delete('/:id', deleteAgendamento)

export default router