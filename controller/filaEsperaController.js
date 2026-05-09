const { getAll, getFilaEsperaById, insertFilaEspera, updateFilaEspera, deleteById } = require("../service/filaEsperaService")

function getFilaEsperas(req, res) {
    try {
        const filas = getAll()
        res.send(filas)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR FILAS DE ESPERA: " + error.message)
    }
}

function getFilaEspera(req, res) {
    try {
        const id = req.params.id
        const fila = getFilaEsperaById(id)
        res.send(fila)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR FILA DE ESPERA: " + error.message)
    }
}

function postFilaEspera(req, res) {
}

function patchFilaEspera(req, res) {
}

function deleteFilaEspera(req, res) {
    try {
        const id = req.params.id
        deleteById(id)
        res.send("Fila de Espera deletada com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO REMOVER FILA DE ESPERA: " + error.message)
    }
}

module.exports = {
    getFilaEsperas,
    getFilaEspera,
    postFilaEspera,
    patchFilaEspera,
    deleteFilaEspera
}