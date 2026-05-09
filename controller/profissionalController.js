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
}

function postProfissional(req, res) {
}

function patchProfissional(req, res) {
}

function deleteProfissional(req, res) {
}

module.exports = {
    getProfissionais,
    getProfissional,
    postProfissional,
    patchProfissional,
    deleteProfissional
}