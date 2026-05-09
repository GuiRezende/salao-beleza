const { Router } = require("express")
const router = Router()
const { getProfissionais, getProfissional, postProfissional, patchProfissional, deleteProfissional } = require("../controller/profissionalController")

router.get('/', getProfissionais)
router.get('/:id', getProfissional)
router.post('/', postProfissional)
router.patch('/:id', patchProfissional)
router.delete('/:id', deleteProfissional)

module.exports = router