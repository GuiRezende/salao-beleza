const { Router } = require("express")
const router = Router()
const { getServicos, getServico, postServico, patchServico, deleteServico } = require("../controller/servicoController")

router.get('/', getServicos)
router.get('/:id', getServico)
router.post('/', postServico)
router.patch('/:id', patchServico)
router.delete('/:id', deleteServico)

module.exports = router