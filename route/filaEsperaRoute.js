const { Router } = require("express")
const router = Router()
const { getFilaEsperas, getFilaEspera, postFilaEspera, patchFilaEspera, deleteFilaEspera } = require("../controller/filaEsperaController")

router.get('/', getFilaEsperas)
router.get('/:id', getFilaEspera)
router.post('/', postFilaEspera)
router.patch('/:id', patchFilaEspera)
router.delete('/:id', deleteFilaEspera)

module.exports = router