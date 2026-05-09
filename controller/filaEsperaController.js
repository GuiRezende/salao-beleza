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
}

function postFilaEspera(req, res) {
}

function patchFilaEspera(req, res) {
}

function deleteFilaEspera(req, res) {
}

module.exports = {
    getFilaEsperas,
    getFilaEspera,
    postFilaEspera,
    patchFilaEspera,
    deleteFilaEspera
}