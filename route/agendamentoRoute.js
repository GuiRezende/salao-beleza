const { Router } = require("express")
const router = Router()
const { getAgendamentos, getAgendamento, postAgendamento, patchAgendamento, deleteAgendamento } = require("../controller/agendamentoController")

router.get('/', getAgendamentos)
router.get('/:id', getAgendamento)
router.post('/', postAgendamento)
router.patch('/:id', patchAgendamento)
router.delete('/:id', deleteAgendamento)

module.exports = router