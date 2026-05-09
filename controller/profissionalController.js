const { getAll, getProfissionalById, insertProfissional, updateProfissional, deleteById } = require("../service/profissionalService")

function getProfissionais(req, res) {
    try {
        const profissionais = getAll()
        res.send(profissionais)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR PROFISSIONAIS: " + error.message)
    }
}

function getProfissional(req, res) {
    try {
        const id = req.params.id
        const profissional = getProfissionalById(id)
        res.send(profissional)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR PROFISSIONAL: " + error.message)
    }
}

function postProfissional(req, res) {
}

function patchProfissional(req, res) {
}

function deleteProfissional(req, res) {
    try {
        const id = req.params.id
        deleteById(id)
        res.send("Profissional deletado(a) com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO REMOVER PROFISSIONAL: " + error.message)
    }
}

module.exports = {
    getProfissionais,
    getProfissional,
    postProfissional,
    patchProfissional,
    deleteProfissional
}