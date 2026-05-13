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
    try {
        const body = req.body
        insertFilaEspera(body)
        res.send("Fila de Espera inserida com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO INSERIR FILA DE ESPERA: " + error.message)
    }
}

function patchFilaEspera(req, res) {
    try {
        updateFilaEspera(req.body, req.params.id)
        res.send("Fila de espera atualizada com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO ATUALIZAR FILA DE ESPERA: " + error.message)
    }
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