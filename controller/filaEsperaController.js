import { getAll, getFilaEsperaById, insertFilaEspera, updateFilaEspera, deleteById } from "../service/filaEsperaService.js"

async function getFilaEsperas(req, res) {
    try {
        const filas = await getAll()
        res.send(filas)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR FILAS DE ESPERA: " + error.message)
    }
}

async function getFilaEspera(req, res) {
    try {
        const id = req.params.id
        const fila = await getFilaEsperaById(id)
        res.send(fila)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR FILA DE ESPERA: " + error.message)
    }
}

async function postFilaEspera(req, res) {
    try {
        const body = req.body
        await insertFilaEspera(body)
        res.send("Fila de Espera inserida com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO INSERIR FILA DE ESPERA: " + error.message)
    }
}

async function patchFilaEspera(req, res) {
    try {
        const fila = await updateFilaEspera(req.params.id, req.body)
        res.send("Fila de espera atualizada com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO ATUALIZAR FILA DE ESPERA: " + error.message)
    }
}

async function deleteFilaEspera(req, res) {
    try {
        const id = req.params.id
        await deleteById(id)
        deleteById(id)
        res.send("Fila de Espera deletada com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO REMOVER FILA DE ESPERA: " + error.message)
    }
}

export {
    getFilaEsperas,
    getFilaEspera,
    postFilaEspera,
    patchFilaEspera,
    deleteFilaEspera
}