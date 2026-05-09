const { getAll, getServicoById, insertServico, updateServico, deleteById } = require("../service/servicoService")

function getServicos(req, res) {
    try {
        const servicos = getAll()
        res.send(servicos)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR SERVICOS: " + error.message)
    }
}

function getServico(req, res) {
}

function postServico(req, res) {
}

function patchServico(req, res) {
}

function deleteServico(req, res) {
}

module.exports = {
    getServicos,
    getServico,
    postServico,
    patchServico,
    deleteServico
}